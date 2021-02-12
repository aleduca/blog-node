exports.messages = (messages) => {
  let messages_validation = {};
  if (messages["errors"]) {
    messages["errors"].forEach((message) => {
      messages_validation[message.param] = message.msg;
    });
  } else {
    for (const key in messages) {
      messages_validation[key] = messages[key];
    }
  }
  return messages_validation;
};
