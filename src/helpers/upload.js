const sharp = require('sharp');

exports.upload = async (files, folder, extension, fileName) => {
	switch (extension) {
		case 'png':
			await sharp(files['file']['path'], { failOnError: false })
				.resize(350)
				.png({ quality: 50 })
				.toFile(folder + '/images/' + fileName + '.' + extension);
			break;

		case 'jpg':
		case 'jpeg':
			await sharp(files['file']['path'], { failOnError: false })
				.resize(350)
				.jpeg({ quality: 50 })
				.toFile(folder + '/images/' + fileName + '.' + extension);
			break;
	}
};
