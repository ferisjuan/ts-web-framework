import { Collection } from '../models/Collection'

export abstract class CollectionView<T, K> {
	constructor(public collection: Collection<T, K>, public parent: Element) {}

	abstract renderItem(itemParent: Element, model: T): void

	render(): void {
		this.parent.innerHTML = ''

		const templateElement = document.createElement('template')

		const models = this.collection.models
		console.log(models)

		for (const model of models) {
			console.log(model)

			const itemParent = document.createElement('div')
			this.renderItem(itemParent, model)
			templateElement.content.append(itemParent)
		}

		this.parent.append(templateElement.content)
	}
}
