const mongoose = require("mongoose");

const validateMongoId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if(!valid) throw new Error('mongo Id not found')
};

module.exports ={
    validateMongoId
}