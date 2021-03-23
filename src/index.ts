import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'
import { UserList } from './views/UserList'

const users = new Collection<User, UserProps>(
	'http://localhost:3000/users',
	(json: UserProps) => {
		return User.create(json)
	}
)

users.on('change', () => {
	const root = document.getElementById('root')

	if (root) {
		new UserList(users, root).render()
	}
})

users.fetch()
