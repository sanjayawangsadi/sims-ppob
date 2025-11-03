import express from "express";
import { app_url, app_port } from "./infrastructures/configs/app";
import { authMiddleware } from "./infrastructures/middleware/auth-middleware";
import Guest from "./presentation/routes/guest";
import Transaction from "./presentation/routes/transaction";
import Profile from "./presentation/routes/profile";

const app = express();

app.use(express.json());

app.use("/", Guest);
app.use("/", authMiddleware, Transaction);
app.use("/profile", authMiddleware, Profile);

app.listen(app_port, () => {
  console.log(`Server running at http://${app_url}:${app_port}`);
});
