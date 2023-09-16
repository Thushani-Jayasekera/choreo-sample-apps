import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default async function federatedSignOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the site base url.
  const baseUrl = "http://localhost:3000";

  const router = useRouter();

  try {
    const requestBody = JSON.parse(req.body);
    const idToken = requestBody.idToken;
    const session = await getSession({ req });
    if (!session) {
      return res.redirect(baseUrl);
    }

    // Asgardeo logout endpoint.
    const endSessionURL = `https://api.asgardeo.io/t/areeb/oidc/logout`;

    const redirectURL = `http://localhost:3000/`;

    const endSessionParams = new URLSearchParams({
      id_token_hint: idToken,
      post_logout_redirect_uri: redirectURL,
    });
    const fullUrl = `${endSessionURL}?${endSessionParams.toString()}`;
    return res.redirect(fullUrl);
  } catch (error) {
    res.redirect(baseUrl);
  }
}
