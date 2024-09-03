import { BackGradientSetting, BackGradientSettings } from "./ring.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const backGradientAnimation = (id: string) => {
  const backGradient: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!backGradient) return;
  window.addEventListener("DOMContentLoaded", () => update(backGradient));
  window.addEventListener("resize", () => update(backGradient));
};

function update(backGradient: HTMLElement) {
  const setting: BackGradientSetting =
    CalculateCurrentSetting(BackGradientSettings);
  backGradient.style.top = `${setting.top}px`;
  backGradient.style.left = `${setting.left}px`;
  backGradient.style.height = `${setting.height}px`;
  backGradient.style.width = `${setting.width}px`;
  backGradient.style.rotate = `${setting.degree}deg`;
  // backGradient.setAttribute("color1", setting.color1);
  // backGradient.setAttribute("color2", setting.color2);
}
