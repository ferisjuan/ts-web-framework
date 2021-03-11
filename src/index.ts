import { User } from './models/User'

const user = new User({})

user.set({ name: 'new record', age: 0 })

user.save()
