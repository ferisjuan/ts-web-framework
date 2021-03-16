import { User } from './models/User'

const user = User.create({
	id: 3,
	name: 'Carlos',
	age: 42,
})

user.on('fetch', () => {
	console.log(user)
})

user.fetch()
