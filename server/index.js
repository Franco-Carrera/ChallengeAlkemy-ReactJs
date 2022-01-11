import apiRoutes from "./routes/route.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";

let app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/", apiRoutes);

app.get("/hulk", (req, res) => {
  console.log(res, req);
});

//
const server = app.listen(process.env.PORT, () => {
  const message = `| Server listen on port ${process.env.PORT} |`;
  const link = `| - http://localhost:${process.env.PORT}    |`;
  console.log("-".repeat(message.length));
  console.log(message);
  console.log(link);
  console.log("-".repeat(message.length));
});
server.on("error", (error) => console.log(`Error server: ${error}`));

export default app;
