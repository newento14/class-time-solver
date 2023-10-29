import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", router);

const PORT = 8899;

function start() {
  try {
    app.listen(PORT, () => console.log(`server start on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
