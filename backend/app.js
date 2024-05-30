const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
var cors = require("cors");
const app = express();
// const fileUpload = require('express-fileupload')
// app.use(cors({
//     origin: "https://pc-master-api.vercel.app",
//     credentials: true
// }));

const allowedOrigins = ["https://pc-master.vercel.app"];

// app.use(express.json());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use(fileUpload());

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

app.use(errorMiddleware);
module.exports = app;
