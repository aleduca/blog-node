const { inHome } = require('../database/repository/post');
const { MASTER_DIR } = require('../helpers/constants');

const index = async function (request, response) {
  try {
    const posts = await inHome(request);

    // return response.json(data);

    return response.render('home', {
      layout: MASTER_DIR,
      title: 'Home',
      posts,
    });
  } catch (error) {
    console.log(error);
  }
  // request.session.name = "Alexandre";
};

module.exports = { index };
