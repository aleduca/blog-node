exports.editUser = function (request, response, next) {
  if (!request?.session?.user) {
    return response.redirect('/');
  }

  next();
};
