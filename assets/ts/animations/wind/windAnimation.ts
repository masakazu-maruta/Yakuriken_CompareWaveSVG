import { WindSetting, WindSettings } from "./wind.config";
import { CalculateCurrentSetting } from "../globalAnimationSetting.config";

export const windAnimation = (id: string) => {
  const wind: HTMLElement = document.getElementById(id) as HTMLElement;
  if (!wind) return;
  window.addEventListener("DOMContentLoaded", () => update(wind));
  window.addEventListener("resize", () => update(wind));
};

function update(wind: HTMLElement) {
  const setting: WindSetting = CalculateCurrentSetting(WindSettings);
  wind.setAttribute("x1", `${setting.x1}`);
  wind.setAttribute("y1", `${setting.y1}`);
  wind.setAttribute("x2", `${setting.x2}`);
  wind.setAttribute("y2", `${setting.y2}`);
  wind.setAttribute("amplitude", `${setting.amplitude}`);
  wind.setAttribute("frequency", `${setting.frequency}`);
  wind.setAttribute("shift", `${setting.shift}`);
  wind.setAttribute("line-width", `${setting.lineWidth}`);
}
