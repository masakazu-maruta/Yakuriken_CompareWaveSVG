import {
  BREAKPOINTS,
  BreakpointSettings,
  StyleSetting,
} from "../globalAnimationSetting.config";

export interface WaveSetting extends StyleSetting {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  amplitude: number;
  frequency: number;
  shift: number;
  speed: number;
  lineWidth: number;
}

export const FrontWaveSettings: BreakpointSettings<WaveSetting> = {
  [BREAKPOINTS.pc]: {
    x1: -180,
    y1: 1000,
    x2: 1400,
    y2: -180,
    amplitude: 180,
    frequency: 2.5,
    shift: 0,
    speed: 0.24,
    lineWidth: 3,
  },
  [BREAKPOINTS.tablet]: {
    x1: -100,
    y1: 1000,
    x2: 868,
    y2: 0,
    amplitude: 100,
    frequency: 2.5,
    shift: 0,
    speed: 0.24,
    lineWidth: 3,
  },
  [BREAKPOINTS.mobile]: {
    x1: -75,
    y1: 720,
    x2: 450,
    y2: 240,
    amplitude: 75,
    frequency: 2,
    shift: 0,
    speed: 0.24,
    lineWidth: 3,
  },
};

export const BackWaveSettings: BreakpointSettings<WaveSetting> = {
  [BREAKPOINTS.pc]: {
    x1: -92,
    y1: 870,
    x2: 1400,
    y2: -92,
    amplitude: 92,
    frequency: 2.5,
    shift: 0,
    speed: 0.56,
    lineWidth: 5,
  },
  [BREAKPOINTS.tablet]: {
    x1: -42,
    y1: 900,
    x2: 868,
    y2: -42,
    amplitude: 42,
    frequency: 3,
    shift: 0,
    speed: 0.56,
    lineWidth: 5,
  },
  [BREAKPOINTS.mobile]: {
    x1: -37,
    y1: 640,
    x2: 450,
    y2: 320,
    amplitude: 37,
    frequency: 2,
    shift: 0,
    speed: 0.56,
    lineWidth: 3,
  },
};
