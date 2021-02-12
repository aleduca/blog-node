const { messages } = require('./messages');

exports.flash = (request, response) => {
  if (request.session?.messages) {
    response.locals.messages = messages(request.session.messages);
  }
  delete request.session.messages;
};
