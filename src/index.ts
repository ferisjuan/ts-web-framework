import { User } from './models/User'

const user = new User({
	name: 'another name',
	age: 0,
})

user.on('save', () => {
	console.log('User saved')
})

user.save()
