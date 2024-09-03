import {
  BREAKPOINTS,
  BreakpointSettings,
  StyleSetting,
} from "../globalAnimationSetting.config";

export interface WindSetting extends StyleSetting {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  amplitude: number;
  frequency: number;
  shift: number;
  // speed: number;
  lineWidth: number;
}

export const WindSettings: BreakpointSettings<WindSetting> = {
  [BREAKPOINTS.pc]: {
    x1: -36,
    y1: 1050,
    x2: 1100,
    y2: -36,
    amplitude: 36,
    frequency: 5,
    shift: 0,
    lineWidth: 3,
  },
  [BREAKPOINTS.tablet]: {
    x1: -31,
    y1: 1000,
    x2: 868,
    y2: 0,
    amplitude: 31,
    frequency: 5,
    shift: 0,
    lineWidth: 3,
  },
  [BREAKPOINTS.mobile]: {
    x1: -23,
    y1: 800,
    x2: 450,
    y2: 300,
    amplitude: 23,
    frequency: 2,
    shift: 0,
    lineWidth: 3,
  },
};
