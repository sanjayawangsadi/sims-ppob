import express from "express";
import { app_url, app_port } from "./infrastructures/configs/app";
import Banner from "./presentation/routes/banner";
import Service from "./presentation/routes/service";

const app = express();

app.use("/banner", Banner);
app.use("/services", Service);

app.listen(app_port, () => {
  console.log(`Server running at http://${app_url}:${app_port}`);
});
