# Auth0 Machine to Machine API Example

This project demonstrates how to secure an Express.js API using Auth0's **Machine to Machine** (M2M) authentication with access tokens, and how to call the protected endpoint using an Auth0-issued token.

## 🔐 How Auth0 M2M Authentication Works

### Overview

Machine to Machine (M2M) authentication in Auth0 is used when two services (e.g., backend APIs) need to communicate securely using access tokens. There is no user involved — it's purely service-to-service authentication.

### Flow Summary

1. **API is registered in Auth0** as a resource (`audience`).
2. **A Machine-to-Machine Application** is created in Auth0 and granted access to the API.
3. The app sends a `POST` request to the `/oauth/token` endpoint with:
   - `client_id`
   - `client_secret`
   - `audience` (API identifier)
   - `grant_type=client_credentials`
4. Auth0 validates the credentials and returns an `access_token`.
5. The service uses the `access_token` as a Bearer token to access the API.

---

## 🔧 Setup

### 1. Clone this Repo

```bash
git clone git@github.com:EmiRoberti77/auth0_m2m_access.git
cd auth0_m2m_access
npm install
```

### 2. Create a `.env.local` file

```env
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=your-api-identifier
AUTH0_DOMAIN=your-tenant.auth0.com
GRANT_TYPE=client_credentials
ORGANIZATION=your-organization-id (optional)
```

### 3. Run the Protected API

```bash
npx ts-node src/server.ts
```

### 4. Call the Protected Endpoint

```bash
npx ts-node src/client.ts
```

---

## 🛡️ Server (`server.ts`)

- Uses `express-oauth2-jwt-bearer` middleware to protect `/protected_api`.
- Validates the JWT access token using your Auth0 domain and audience.

```ts
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});
```

---

## 🤖 Client (`client.ts`)

- Uses `axios` to get an access token from Auth0.
- Sends a request to the protected API with the token as a Bearer header.

---

## 🧪 Expected Output

When calling the API with a valid token:

```json
{
  "message": "Access granted to protected endpoint!",
  "tokenPayload": {
    "sub": "...",
    "aud": "...",
    ...
  }
}
```

---

## 🧼 Notes

- Never commit `.env.local` to Git.
- Only expose values prefixed with `NEXT_PUBLIC_` in frontend projects.
- Use HTTPS in production environments.

---

## 📚 Learn More

- [Auth0 M2M Docs](https://auth0.com/docs/get-started/authentication-and-authorization-flow/machine-to-machine-flow)
- [express-oauth2-jwt-bearer](https://www.npmjs.com/package/express-oauth2-jwt-bearer)

## Author

Emi Roberti
