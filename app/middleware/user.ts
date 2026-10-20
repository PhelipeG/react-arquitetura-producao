import { createContext, type MiddlewareFunction } from 'react-router';

import { getMe } from '@/features/auth/api/get-me';
import type { CurrentUser } from '@/types/generated/types.gen';

export const userContext = createContext<CurrentUser>();

function hasAuthCookies(request: Request): boolean {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return false;

  return (
    cookieHeader.includes('accessToken=') ||
    cookieHeader.includes('refreshToken=')
  );
}

export const userMiddleware: MiddlewareFunction = async (
  { request, context },
  next,
) => {
  const isServer = typeof document === 'undefined';
  const cookieHeader = request.headers.get('Cookie') || undefined;

  // On the server, skip the /auth/me call when there are no auth cookies.
  // On the client, Cookie is often unavailable on the navigation Request, so
  // always try getMe and let the browser send HttpOnly cookies via credentials.
  if (isServer && !hasAuthCookies(request)) {
    context.set(userContext, null);
    return next();
  }

  try {
    const user = await getMe(isServer ? cookieHeader : undefined);
    context.set(userContext, user);
  } catch {
    context.set(userContext, null);
  }

  return next();
};
