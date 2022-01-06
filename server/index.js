import apiRoutes from "./routes/route.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

var app = express();
//let o const

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));

app.use("/", apiRoutes);

app.get("/hulk", (req, res) => {
  console.log(res, req);
});

//
app.listen(app.get("port"), () => {
  console.log(`Server running on Port ${app.get("port")}`);
});

export default app;
