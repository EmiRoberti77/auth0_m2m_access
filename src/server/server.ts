import express from "express";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());
const port = 3000;

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

app.post("/protected_api", checkJwt, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected endpoint!",
    tokenPayload: (req as any).auth, // shows decoded JWT info
  });
});

app.listen(port, () => {
  console.log(`Protected API listening on http://localhost:${port}`);
});
