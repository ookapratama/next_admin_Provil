import { NextRequest, NextResponse } from 'next/server';
// import type {  } from 'next/server';
import { demoPagesMenu } from '@call-root-lib/menu';

const isLogin: boolean = true;

export const middleware = (request: NextRequest) => {
	// console.log('tes : ' + demoPagesMenu.login.path);
	// if (request.nextUrl.pathname.startsWith(demoPagesMenu.login.path)) {
	// 	return NextResponse.rewrite(new URL(demoPagesMenu.login.path, request.url));
	// }

	if (isLogin) return NextResponse.next();
		return NextResponse.redirect(new URL(`/${demoPagesMenu.login.path}`, request.url));
	// console.log(request.nextUrl.pathname.startsWith(`/${demoPagesMenu.login.path}`))
	// console.log('login');
};

export const config = {
	matcher: ['/admin/:path*', '/'],
};
