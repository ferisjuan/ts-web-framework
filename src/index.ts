import { User } from './models/User'

const user = new User({})
user.on('change', () => {})
user.on('click', () => {})
user.on('move', () => {})

console.log(user)
