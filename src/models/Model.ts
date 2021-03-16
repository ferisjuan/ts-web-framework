import { AxiosPromise, AxiosResponse } from 'axios'

interface ModelAttributes<T> {
	get<K extends keyof T>(key: K): T[K]
	getAll(): T
	set(update: T): void
}

interface Events {
	on(eventName: string, callback: () => void): void
	trigger(eventName: string): void
}

interface Sync<T> {
	fetch(id: number): AxiosPromise<T>
	save(data: T): AxiosPromise<T>
}

interface hasId {
	id?: number
}

export class Model<T extends hasId> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: Sync<T>
	) {}

	get on() {
		return this.events.on
	}

	get trigger() {
		return this.events.trigger
	}

	get get() {
		return this.attributes.get
	}

	set(update: T): void {
		this.attributes.set(update)
		this.trigger('change')
	}

	fetch(): void {
		const id = this.attributes.get('id')
		if (typeof id !== 'number') throw new Error('Cannot fetch without an id')

		this.sync
			.fetch(id)
			.then((response: AxiosResponse): void => {
				this.attributes.set(response.data) // skip event triggering
			})
			.then(() => {
				this.trigger('fetch')
			})
	}

	save(): void {
		const data = this.attributes.getAll()
		this.sync
			.save(data)
			.then((response: AxiosResponse): void => {
				this.trigger('save')
			})
			.catch(() => {
				this.trigger('error')
			})
	}
}
