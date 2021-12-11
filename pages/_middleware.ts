import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { instance } from '../store/reducers/api';

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  const token = req.cookies.auth;
  const redirect = (url: string) => {
    const isAuthPage = req.url.includes(url);
    if (!isAuthPage) return NextResponse.redirect(url).clearCookie('auth');
  };

  if (!!token) {
    const valid = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
    try {
      if (valid) {
        if (req.url.includes('/login')) return NextResponse.redirect('/');
        instance.defaults.headers.common.Cookie = `auth=${token}`;
        return NextResponse.next();
      }
    } catch (e) {
      return redirect('/login');
    }
  }
  return redirect('/login');
};
