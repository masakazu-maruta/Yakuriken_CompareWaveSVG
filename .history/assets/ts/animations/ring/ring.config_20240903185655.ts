import {
  BREAKPOINTS,
  BreakpointSettings,
  StyleSetting,
} from "../globalAnimationSetting.config";

export interface BackGradientSetting extends StyleSetting {
  top: number;
  left: number;
  width: number;
  height: number;
  degree: number;
  //   color1: string; //"0,0,0,0" r = 0 ,g = 0 ,b = 0 ,a = 0 の例
  //   color2: string; //"0,0,0,0" r = 0 ,g = 0 ,b = 0 ,a = 0 の例
}

export const BackGradientSettings: BreakpointSettings<BackGradientSetting> = {
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
