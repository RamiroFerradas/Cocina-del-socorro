"use server";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token");
  const requestedPage = req.nextUrl.pathname;
  const loginUrl = "/login";
  if (!req.url.includes(loginUrl)) {
    if (!access_token) {
      const url = req.nextUrl.clone();
      url.pathname = loginUrl;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }
  }
  // if (access_token && req.url.includes(loginUrl)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/home";
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/home",
    "/branches/list",
    "/branches/locations",
    "/branches/contacts",
    "/branches/users",
    "/branches/settings",
    "/sales/dashboard",
    "/sales/invoices",
    "/sales/customers",
    "/sales/payments",
    "/sales/settings",
    "/products/inventory",
    "/products/categories",
    "/products/pricing",
    "/products/stock",
    "/products/warehouses",
    "/users/empleados",
    "/users/contrataciones",
    "/users/asistencias",
    "/users/desvinculaciones",
    "/users/configuracion",
    "/suppliers/list",
    "/suppliers/orders",
    "/suppliers/payments",
    "/suppliers/invoices",
    "/suppliers/settings",
  ],
};
