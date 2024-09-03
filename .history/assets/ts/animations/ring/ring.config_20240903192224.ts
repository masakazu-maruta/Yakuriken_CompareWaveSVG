import {
  BREAKPOINTS,
  BreakpointSettings,
  StyleSetting,
} from "../globalAnimationSetting.config";

export interface RingSetting extends StyleSetting {
  top: number;
  left: number;
  width: number;
  height: number;
  duration: number;
  lineWidth: number;
  numberRing: number;
}

export const UpLargeRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 160,
    height: 160,
    top: 100,
    left: 600,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 160,
    height: 160,
    top: 600,
    left: 300,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 100,
    height: 100,
    top: 200,
    left: 120,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const UpMediumRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 100,
    height: 100,
    top: 350,
    left: 960,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 100,
    height: 100,
    top: 670,
    left: 520,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 64,
    height: 64,
    top: 320,
    left: 250,
    duration: 48,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
export const UpSmallRingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 72,
    height: 72,
    top: 562,
    left: 715,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 72,
    height: 72,
    top: 520,
    left: 560,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 48,
    height: 48,
    top: 150,
    left: 300,
    duration: 32,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
