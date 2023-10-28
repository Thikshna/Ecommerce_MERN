const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfuly");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
// mongodb+srv://thikshnasg:Thikshna%401@ecomcluster.vjhy6mg.mongodb.net/
