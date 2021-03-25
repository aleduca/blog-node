const { avatar } = require('../models/');

exports.upload = async (user, imagePath) => {
	const avatarFound = await avatar.findOne({
		where: {
			userId: user.id,
		},
	});

	if (avatarFound) {
		await avatar.update(
			{
				path: imagePath,
			},
			{
				where: {
					userId: user.id,
				},
			}
		);
	} else {
		await avatar.create({
			path: imagePath,
			userId: user.id,
		});
	}
};
