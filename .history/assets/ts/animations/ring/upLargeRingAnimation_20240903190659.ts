import { RingSetting, UpLargeRingSettings } from "./ring.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const ring1Animation = (id: string) => {
  const backGradient: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!backGradient) return;
  window.addEventListener("DOMContentLoaded", () => update(backGradient));
  window.addEventListener("resize", () => update(backGradient));
};

function update(ring: HTMLElement) {
  const setting: RingSetting = CalculateCurrentSetting(UpLargeRingSettings);
  ring.style.top = `${setting.top}px`;
  ring.style.left = `${setting.left}px`;
  ring.style.height = `${setting.height}px`;
  ring.style.width = `${setting.width}px`;
  ring.setAttribute("duration", `${setting.duration}`);
  ring.setAttribute("line-width", `${setting.duration}`);
  ring.setAttribute("number", `${setting.duration}`);
}
