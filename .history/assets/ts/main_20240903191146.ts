import { backGradientAnimation } from "./animations/backGradient/backGradientAnimation";
import { backWaveAnimation } from "./animations/wave/backWaveAnimation";
import { frontWaveAnimation } from "./animations/wave/frontWaveAnimation";
import { upLargeRingAnimation } from "./animations/ring/upLargeRingAnimation";
import { ring2Animation } from "./animations/ring/ring2Animation";
import { ring3Animation } from "./animations/ring/ring3Animation";
import { windAnimation } from "./animations/wind/windAnimation";
import { GradientElement } from "./component/gradient/gradientElement";
import { RingElement } from "./component/ring/ringElement";
import { WaveElement } from "./component/wave/waveElement";
import { WindElement } from "./component/wind/windElement";

customElements.define("custom-wave", WaveElement);
customElements.define("custom-wind", WindElement);
customElements.define("custom-ring", RingElement);
customElements.define("custom-gradient", GradientElement);

backWaveAnimation("js-mainVisual__backWave");
backGradientAnimation("js-mainVisual__backGradient");
frontWaveAnimation("js-mainVisual__frontWave");
windAnimation("js-mainVisual__wind");
ring1Animation("js-mainVisual__largeRing");
ring2Animation("js-mainVisual__mediumRing");
ring3Animation("js-mainVisual__smallRing");
