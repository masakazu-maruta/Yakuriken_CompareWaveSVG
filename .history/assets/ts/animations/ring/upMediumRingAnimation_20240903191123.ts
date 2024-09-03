import { RingSetting, UpMediumRingSettings } from "./ring.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const upLargeRingAnimation = (id: string) => {
  const ring: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!ring) return;
  window.addEventListener("DOMContentLoaded", () => update(ring));
  window.addEventListener("resize", () => update(ring));
};

function update(ring: HTMLElement) {
  const setting: RingSetting = CalculateCurrentSetting(UpMediumRingSettings);
  ring.style.top = `${setting.top}px`;
  ring.style.left = `${setting.left}px`;
  ring.style.height = `${setting.height}px`;
  ring.style.width = `${setting.width}px`;
  ring.setAttribute("duration", `${setting.duration}`);
  ring.setAttribute("line-width", `${setting.duration}`);
  ring.setAttribute("number", `${setting.duration}`);
}
