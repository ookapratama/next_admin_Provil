import { NextRequest, NextResponse } from 'next/server';
import { demoPagesMenu } from '@call-root-lib/menu';
import { GetTokenLogin } from './services/AuthServices/AuthService';


export const middleware = async (req: NextRequest) => {
	const token = req.cookies.get('token');
	console.log('middleware : ', token);
	// if (req.nextUrl.pathname.startsWith(demoPagesMenu.login.path)) {
	// 	return NextResponse.rewrite(new URL(demoPagesMenu.login.path, req.url));
	// }

	if (token?.value) {
		return NextResponse.next();
	}
	return NextResponse.redirect(new URL(`/${demoPagesMenu.login.path}`, req.url));
	// console.log(request.nextUrl.pathname.startsWith(`/${demoPagesMenu.login.path}`))
};

export const config = {
	matcher: ['/admin/:path*', '/'],
};
