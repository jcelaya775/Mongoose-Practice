const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 == 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    address: addressSchema
})

// cannot use arrow (es6) functions
userSchema.methods.sayHi = function () {
    // b/c this instance keyword is needed
    console.log(`Hi. My name is ${this.name}`);
}

// static level method
userSchema.statics.findByName = function (name) {
    return this.find({ name: new RegExp(name, 'i') })
}

// query level method
userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') })
}

// virtual method -> namedEmail property does not get saved in db
userSchema.virtual('namedEmail').get(function () {
    return `${this.name} <${this.email}>`
})

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

userSchema.post('save', function (doc, next) {
    doc.sayHi()
    next()
})

module.exports = mongoose.model('User', userSchema)