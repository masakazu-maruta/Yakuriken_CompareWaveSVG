import { WaveSetting, FrontWaveSettings } from "./wave.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const frontWaveAnimation = (id: string) => {
  const frontWave: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!frontWave) return;
  window.addEventListener("DOMContentLoaded", () => update(frontWave));
  window.addEventListener("resize", () => update(frontWave));
};

function update(frontWave: HTMLElement) {
  const setting: WaveSetting = CalculateCurrentSetting(FrontWaveSettings);
  frontWave.setAttribute("x1", `${setting.x1}`);
  frontWave.setAttribute("y1", `${setting.y1}`);
  frontWave.setAttribute("x2", `${setting.x2}`);
  frontWave.setAttribute("y2", `${setting.y2}`);
  frontWave.setAttribute("amplitude", `${setting.amplitude}`);
  frontWave.setAttribute("frequency", `${setting.frequency}`);
  frontWave.setAttribute("shift", `${setting.shift}`);
  frontWave.setAttribute("speed", `${setting.speed}`);
  frontWave.setAttribute("line-width", `${setting.lineWidth}`);
}
