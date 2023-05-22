import React from 'react';
import { DEFAULT_BREAKPOINT, GetBreakpoint } from './getBreakpoint';

export const BreakpointContext =
  React.createContext<GetBreakpoint>(DEFAULT_BREAKPOINT);
