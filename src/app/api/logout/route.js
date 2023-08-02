import { NextResponse } from "next/server";

export async function GET(req, res) {
  // Clear the token cookie
  const response = NextResponse.json(
    {
      message: 'Logout successful',
      success: true,
    },
    { status: 200 } // Use 200 for a successful response
  );

  // Set an empty JWT token in the "token" cookie with an HTTP-only flag
  response.cookies.set("token", "", {
    httpOnly: true,
  });

  return response;
}
