/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'User must have a name. Please provide name'],
		trim: true,
	},
	email: {
		type: String,
		required: [
			true,
			'Every User must have a unique Email. Please provide Email',
		],
		unique: [true, 'Email already in use'],
		validate: [validator.isEmail, 'Invalid Email'],
		lowercase: true,
	},
	status: String,
	quests: Number,
	badges: Number,
	dateJoined: Date,
	profile: String,
	institution: String
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
});

userSchema.virtual('milestones').get(function () {
	const milestones = [
		(this.quests / 10 + this.badges / 5) / 2 * 100,
		(this.quests / 20 + this.badges / 10) / 2 * 100,
		(this.quests / 30 + this.badges / 15) / 2 * 100,
		(this.quests / 40 + this.badges / 20) / 2 * 100,
	];
	return milestones;
})

const User = mongoose.model('User', userSchema);

module.exports = User;