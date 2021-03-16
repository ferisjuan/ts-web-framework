import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'

const collection = new Collection<User, UserProps>(
	'http://localhost:3000/users',
	(json: UserProps): User => User.create(json)
)

collection.on('change', () => {
	console.log(collection.models)
})

collection.fetch()
