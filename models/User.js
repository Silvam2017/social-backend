const { Schema, model, Types } = require('mongoose');
// need to add getters: true to bottom, and get statement to model field

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'You need to provide a username.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email Address is Required',
        validate: [validateEmail, 'Please use a valid email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address.']
        },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    }
);

//get total count of friends on retrieval uses a VIRTUAL
UserSchema.virtual('friendCount').get(function() {
    // this function differs from the module, in that we do not need to add replies and comments togethers.
    return this.friends.length
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

//export User model
module.exports = User;