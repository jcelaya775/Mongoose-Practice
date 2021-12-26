const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect('mongodb://localhost/testdb', () => console.log('connected'), e => console.error(e))

// run()

// async function run() {
//     // const user = new User({ name: 'Jorge', age: 20 })
//     // await user.save()
//     // try {
//     //     const user = await User.create({
//     //         name: 'Jorge', age: 20, hobbies: ['Weight Lifitng', 'Bowling'],
//     //         address: { street: 'Main St' }, email: 'jcelaya775@gmail.com'
//     //     })

//     //     console.log(user);
//     // } catch (e) {
//     //     console.log(e.message);
//     // }

//     try {
//         const user = await User.where('age')
//             .gt(12)
//             .where('name')
//             .populate('bestFriend')
//             .equals('Jorge')

//         console.log(user)
//     } catch (e) {
//         console.log(e.message)
//     }
// }

run()

async function run() {
    try {
        const user = await User.findOne({ name: 'Jorge' })
        console.log(user);
        await user.save()
        console.log(user.namedEmail);
        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}

console.log('test')