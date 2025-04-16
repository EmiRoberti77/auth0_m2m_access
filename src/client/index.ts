import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function getAccessToken(): Promise<string> {
  const body = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    organization: process.env.ORGANIZATION,
  };

  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.access_token;
    console.log(token);
    return token;
  } catch (err: any) {
    console.log(err.message);
    return "_ERROR";
  }
}

async function callProtectedApi() {
  const token = await getAccessToken();
  const response = await axios.post(
    "http://localhost:3000/protected_api",
    {
      data: "emi",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
}

callProtectedApi();
