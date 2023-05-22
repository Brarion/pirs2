import Parser from 'ua-parser-js';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export enum Breakpoint {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export type GetBreakpoint = {
  isMobile: boolean;
  isTablet: boolean;
  isMobileOrTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint;
};

const USER_AGENT_KEY = 'user-agent';

enum Type {
  Mobile = 'mobile',
  Tablet = 'tablet',
}

export const DEFAULT_BREAKPOINT: GetBreakpoint = {
  isMobile: true,
  isTablet: false,
  isMobileOrTablet: true,
  isDesktop: false,
  breakpoint: Breakpoint.Mobile,
};

type Req = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

const getBreakpointByType = (type?: string) => {
  if (type) {
    if (type === Type.Mobile) {
      return Breakpoint.Mobile;
    }

    return Breakpoint.Tablet;
  }

  return Breakpoint.Desktop;
};

export const getBreakpoint = (req: Req): GetBreakpoint => {
  const headersList = req.headers;

  const userAgent = headersList[USER_AGENT_KEY];

  if (userAgent) {
    const type = Parser(userAgent).device.type;

    return {
      isMobile: type === Type.Mobile,
      isTablet: type === Type.Tablet,
      isMobileOrTablet: type === Type.Mobile || type === Type.Tablet,
      isDesktop: type !== Type.Mobile && type !== Type.Tablet,
      breakpoint: getBreakpointByType(type),
    };
  }

  return DEFAULT_BREAKPOINT;
};
