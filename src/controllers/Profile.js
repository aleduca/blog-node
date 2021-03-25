const { MASTER_DIR } = require('../helpers/constants');

const index = async function (request, response) {
  try {
    response.json('upload');
  } catch (error) {
    console.log(error);
  }
  // request.session.name = "Alexandre";
};

module.exports = { index };
