import { NextResponse } from "next/server";
import { checkToken } from "./utils/usefull";


export async function middleware(request) {

	let path = request.nextUrl.pathname;
	let token = request.cookies.get("nexo-data-1")?.value;
	const response = NextResponse.next()


	let check = await checkToken(token || "");

	if (!token && (path !== "/")) {

		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!token && path === "/") {

		return NextResponse.next();
	}

	if ((token && check?.isValid) && path === "/") {
		return NextResponse.redirect(new URL("/side/todo", request.url));
	}

	if (token && !check?.isValid) {
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: [
		"/",
		"/side/todo"
	],
};