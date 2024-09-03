import { WaveSetting, BackWaveSettings } from "./wave.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const backWaveAnimation = (id: string) => {
  const backWave: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!backWave) return;
  window.addEventListener("DOMContentLoaded", () => update(backWave));
  window.addEventListener("resize", () => update(backWave));
};

function update(backWave: HTMLElement) {
  const setting: WaveSetting = CalculateCurrentSetting(BackWaveSettings);
  backWave.setAttribute("x1", `${setting.x1}`);
  backWave.setAttribute("y1", `${setting.y1}`);
  backWave.setAttribute("x2", `${setting.x2}`);
  backWave.setAttribute("y2", `${setting.y2}`);
  backWave.setAttribute("amplitude", `${setting.amplitude}`);
  backWave.setAttribute("frequency", `${setting.frequency}`);
  backWave.setAttribute("shift", `${setting.shift}`);
  backWave.setAttribute("speed", `${setting.speed}`);
  backWave.setAttribute("line-width", `${setting.lineWidth}`);
}
