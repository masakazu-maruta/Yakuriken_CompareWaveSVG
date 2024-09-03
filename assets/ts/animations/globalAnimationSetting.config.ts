export const BREAKPOINTS = {
  pc: 1140,
  tablet: 768,
  mobile: 375,
};
export interface BreakpointSettings<T extends StyleSetting> {
  [key: number]: T;
}
export type StyleSetting = {
  [property: string]: string | number;
};
export const CalculateCurrentSetting = <T extends StyleSetting>(
  settings: BreakpointSettings<T>
) => {
  const windowWidth = window.outerWidth;
  let prevBreakPoint: number;
  let currBreakPoint: number;
  //pcの処理
  if (outerWidth >= BREAKPOINTS.pc) {
    prevBreakPoint = BREAKPOINTS.pc;
    currBreakPoint = BREAKPOINTS.pc;
  }
  //tabletの処理
  else if (outerWidth >= BREAKPOINTS.tablet) {
    prevBreakPoint = BREAKPOINTS.pc;
    currBreakPoint = BREAKPOINTS.tablet;
  }
  //スマホの処理
  else if (outerWidth >= BREAKPOINTS.mobile) {
    prevBreakPoint = BREAKPOINTS.tablet;
    currBreakPoint = BREAKPOINTS.mobile;
  }
  //スマホの処理
  else {
    prevBreakPoint = BREAKPOINTS.mobile;
    currBreakPoint = BREAKPOINTS.mobile;
  }
  const ratio = calculateWindowRatio(
    windowWidth,
    prevBreakPoint,
    currBreakPoint
  );
  return CalculateBetweenSetting(
    ratio,
    settings[prevBreakPoint],
    settings[currBreakPoint]
  );
};

// スタイルを補間して返す関数
function CalculateBetweenSetting<T extends StyleSetting>(
  ratio: number,
  settings1: T,
  settings2: T
): T {
  const interpolatedSettings: StyleSetting = {};
  for (const key in settings1) {
    if (settings1.hasOwnProperty(key) && settings2.hasOwnProperty(key)) {
      const value1 = settings1[key];
      const value2 = settings2[key];

      if (typeof value1 === "number" && typeof value2 === "number") {
        interpolatedSettings[key] = value1 * ratio + value2 * (1 - ratio);
      } else if (typeof value1 === "string" && typeof value2 === "string") {
        interpolatedSettings[key] = value1;
      }
    }
  }
  return interpolatedSettings as T;
}

//minWidth を　０
//maxWidth　を １００
//とした場合の　width　の割合
function calculateWindowRatio(width: number, maxWidth: number, minWidth) {
  if (maxWidth == minWidth) return 1;
  return (width - minWidth) / (maxWidth - minWidth); // x / 100;
}
