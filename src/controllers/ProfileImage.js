const formidable = require('formidable');
const { upload } = require('../helpers/upload');
const { upload: uploadAvatar } = require('../database/repository/avatar');
const path = require('path');
const fs = require('fs');

const store = function (request, response) {
  try {
    const form = formidable();

    form.parse(request, async (err, fields, files) => {
      try {
        if (err) {
          next(err);
          return;
        }

        // pegar extensao
        const splitName = files['file']['name']?.split('.');
        const extension = splitName[splitName.length - 1];

        if (!splitName) {
          return response.status(401).json('EXTENSION_ERROR');
        }

        if (!['jpg', 'jpeg', 'png'].includes(extension)) {
          return response.status(401).json('EXTENSION_ERROR');
        }

        const fileName = new Date().getTime();
        const folder = path.join(__dirname, '..', '..', 'frontend', 'assets');

        // upload da foto do user
        await upload(files, folder, extension, fileName);

        // deletar a imagem antiga
        const user = request.session.user;

        if (user?.avatar) {
          const image = folder + '/' + user.avatar.path;
          if (fs.existsSync(image)) {
            fs.unlinkSync(image);
          }
        }

        // update or create
        const imagePath = 'images/' + fileName + '.' + extension;
        await uploadAvatar(user, imagePath);

        // atualizar sessao
        user.avatar = {};
        Object.assign(user.avatar, {
          path: imagePath,
        });

        response.json('UPLOAD_USER_AVATAR_SUCCESS').status(200);
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // request.session.name = "Alexandre";
};

module.exports = { store };
