const { validationResult, check } = require("express-validator/check");

function checkForValidationErrors(req, res) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(400).json({ error: validationErrors.array() });
    return true;
  }
  return false;
}

exports.checkForValidationErrors = checkForValidationErrors;
