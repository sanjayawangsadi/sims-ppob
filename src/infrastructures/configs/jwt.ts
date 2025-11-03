import jwt from "jsonwebtoken";

const jwt_secret: string = process.env.JWT_SECRET || "mysecret";
const jwt_expire: number = Number(process.env.JWT_EXPIRE) || 3600;

interface payload {
  id: string;
}

const generate = (id: string) => {
  return jwt.sign(
    {
      id: id,
    },
    jwt_secret,
    { expiresIn: jwt_expire }
  );
};

const decode = (token: string) => {
  return jwt.verify(token, jwt_secret) as payload;
}

export { jwt_secret, jwt_expire, generate, decode };
