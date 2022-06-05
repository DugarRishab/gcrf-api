const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require("./../userModel");

exports.getLeaderboard = catchAsync(async (req, res, next) => {
	const users = await User.find();

	const milestone1 = users.filter(user => user.milestones[0] >= 100).map(user => user.name);
	const milestone2 = users.filter(user => user.milestones[1] >= 100).map(user => user.name);
	const milestone3 = users.filter(user => user.milestones[2] >= 100).map(user => user.name);
	const milestone4 = users.filter(user => user.milestones[3] >= 100).map(user => user.name);
	
	res.status(200).json({
		message: "success",
		data: {
			milestone1,
			milestone2,
			milestone3,
			milestone4
		}
	});
	
})
exports.getReport = catchAsync(async (req, res, next) => {
	
	const user = await User.findOne({email: req.params.email});
	if(!user){
		return next(new AppError(`This Email " ${req.params.email} " is not registered. Please contact your facilitator`, 404));
	}
	res.status(200).json({
		message: 'success',
		data: {
			user,
		},
	});
});
exports.newReport = catchAsync(async (req, res, next) => {
	await User.deleteMany();
	req.body.forEach(async user => {
		try {
			const newUser = await User.create(user);
            console.log('User ', newUser.name, ' created');
		}
		catch (err) {
			console.log(err)
		}
	});
	res.status(200).json({
		message: 'success'
	});
});