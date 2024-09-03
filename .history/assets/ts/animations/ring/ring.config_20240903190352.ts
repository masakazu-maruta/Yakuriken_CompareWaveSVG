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

export const RingSettings: BreakpointSettings<RingSetting> = {
  [BREAKPOINTS.pc]: {
    width: 160,
    height: 160,
    top: 100,
    left: 300,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.tablet]: {
    width: 160,
    height: 160,
    top: 100,
    left: 300,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
  [BREAKPOINTS.mobile]: {
    width: 160,
    height: 160,
    top: 100,
    left: 300,
    duration: 64,
    lineWidth: 0.5,
    numberRing: 4,
  },
};
