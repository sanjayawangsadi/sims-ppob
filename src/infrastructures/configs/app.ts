import "dotenv/config";

const app_url: string = process.env.APP_URL || "localhost";
const app_port: number = Number(process.env.APP_PORT) || 3000;
const app_rounds: number = Number(process.env.APP_ROUNDS);

export { app_url, app_port, app_rounds };
