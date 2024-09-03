import { backGradientAnimation } from "./animations/backGradient/backGradientAnimation";
import { backWaveAnimation } from "./animations/wave/backWaveAnimation";
import { frontWaveAnimation } from "./animations/wave/frontWaveAnimation";
import { upLargeRingAnimation } from "./animations/ring/upLargeRingAnimation";
import { upMediumRingAnimation } from "./animations/ring/upMediumRingAnimation";
import { upSmallRingAnimation } from "./animations/ring/upSmallRingAnimation";
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
upLargeRingAnimation("js-mainVisual__largeRing");
upMediumRingAnimation("js-mainVisual__mediumRing");
upSmallRingAnimation("js-mainVisual__smallRing");
