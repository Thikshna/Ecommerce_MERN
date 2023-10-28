const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const cookie = require("cookie-parser")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const authRouter = require("./routers/auth-roure");
const bodyParser = require("body-parser");
const cors = require("cors")
const { notFound, errorHandler } = require("./middlewares/errorHandlers");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie())
app.use(cors())

// app.use("/", (req, res) => {
//   res.send("hello from server");
// });

app.use("/api/user", authRouter);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server up and running on port ${PORT}`);
});
