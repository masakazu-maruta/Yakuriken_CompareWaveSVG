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
    top: -250,
    left: -250,
    width: 1500,
    height: 1500,
    degree: -20,
  },
  [BREAKPOINTS.tablet]: {
    top: -100,
    left: -150,
    width: 1400,
    height: 1400,
    degree: -50,
  },
  [BREAKPOINTS.mobile]: {
    top: -250,
    left: -250,
    width: 1200,
    height: 1200,
    degree: -34,
  },
};
