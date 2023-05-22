'use client';
import React from 'react';
import { Breakpoint, type GetBreakpoint } from './getBreakpoint';

const getBreakpointByServerBreakpoint = (
  serverBreakpoint: GetBreakpoint
): Breakpoint => {
  if (serverBreakpoint.isMobile) {
    return Breakpoint.Mobile;
  }

  if (serverBreakpoint.isTablet) {
    return Breakpoint.Tablet;
  }

  return Breakpoint.Desktop;
};

export const useBreakpoint = (
  serverBreakpoint: GetBreakpoint
): GetBreakpoint => {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>(
    getBreakpointByServerBreakpoint(serverBreakpoint)
  );

  const handleResize = React.useCallback(() => {
    if (window) {
      if (window.innerWidth >= 992 && breakpoint !== Breakpoint.Desktop) {
        setBreakpoint(Breakpoint.Desktop);
      } else if (window.innerWidth < 768 && breakpoint !== Breakpoint.Mobile) {
        setBreakpoint(Breakpoint.Mobile);
      } else if (
        window.innerWidth >= 768 &&
        window.innerWidth < 992 &&
        breakpoint !== Breakpoint.Tablet
      ) {
        setBreakpoint(Breakpoint.Tablet);
      }
    }
  }, [breakpoint]);

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return {
    isMobile: breakpoint === Breakpoint.Mobile,
    isTablet: breakpoint === Breakpoint.Tablet,
    isMobileOrTablet: breakpoint !== Breakpoint.Desktop,
    isDesktop: breakpoint === Breakpoint.Desktop,
    breakpoint,
  };
};
