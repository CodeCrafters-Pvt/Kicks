require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cronJob = require("./schedulers/removeUsers");
const requireAuth = require("./middlewears/requireAuth");
const credentials=require('./middlewears/credentials')
const cors = require("cors");
const corsOptions=require("./config/corsOptions")
const cookieParser = require("cookie-parser")

app.use(express.json());

// const corsOptionss = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

app.use(credentials)
app.use(cors(corsOptions));

//middleWear
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


//Routers
const userRouter = require("./routes/user");
app.use("/users", userRouter);

const adminRouter = require("./routes/admin");
app.use("/admins", adminRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const refreshRouter = require("./routes/refresh");
app.use("/refresh", refreshRouter);

app.use(requireAuth);
const productRouter = require("./routes/product");
app.use("/products", productRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server started on ", process.env.PORT);
      cronJob.start();
    });
  })
  .catch((error) => {
    console.log(error);
  });
