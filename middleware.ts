"use server";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token");
  const requestedPage = req.nextUrl.pathname;
  const loginUrl = "/login";

  if (!access_token) {
    const url = req.nextUrl.clone();
    url.pathname = loginUrl;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products", "/sales", "/home"],
};
