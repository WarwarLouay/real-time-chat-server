const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.get("/", (req, res) => {
    res.send("Welcome to our chat app APIs...");
});

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});

app.use("/api", require("./Routes/app.routes"));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log(error));
