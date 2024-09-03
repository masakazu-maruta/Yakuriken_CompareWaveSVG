export class Wind {
  public readonly svg: SVGSVGElement;
  private lineWidth: number = 0;
  private frequency: number = 0;
  private shift: number = 0;
  private mainColor: string = "#fff";
  private fadeColor: string = "#fff";
  private currentTime: number = 0;
  private createTime: number;
  private pathElement: SVGPathElement;
  private gradient: SVGLinearGradientElement | null = null;

  constructor() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");

    this.pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.svg.appendChild(this.pathElement);

    this.createTime = Date.now();
    this.setupGradient(); // グラデーションを一度だけセットアップ
    this.startAnimation();
  }

  /* 風を描画 */
  drawWind() {
    // グラデーションの位置と色を更新
    if (this.gradient) {
      this.updateGradient();
    }
    this.pathElement.setAttribute("stroke-width", `${this.lineWidth}`);
    this.pathElement.setAttribute("d", this.generatePathData());
    this.pathElement.setAttribute("stroke", "url(#gradient)");
    this.pathElement.setAttribute("fill", "none");
  }
  private generatePathData(): string {
    const pathData: string[] = [];
    // 初期位置を設定
    pathData.push(`M 0 ${this.getYByX(0)}`);
    const width = this.svg.clientWidth;
    // 波のパスを生成
    for (let x = 1; x < width; x++) {
      const y = this.getYByX(x);
      pathData.push(`L ${x} ${y}`);
    }

    // パスデータを文字列として返す
    return pathData.join(" ");
  }

  /* グラデーションの位置と色を更新 */
  private updateGradient() {
    const destination = this.svg.clientWidth;
    const time_s = this.currentTime / 1000;
    const lengthRatio = 0.5;
    const locationRatio =
      (((destination * time_s) / 8) % (destination * (1 + lengthRatio))) /
      destination;
    this.coloring(locationRatio, lengthRatio);
  }

  private coloring(locationRatio: number, lengthRatio: number) {
    if (!this.gradient) return;
    const stops = this.gradient.querySelectorAll("stop");
    if (stops.length >= 3) {
      const locationFade1 = (locationRatio - lengthRatio) * 100;
      (stops[0] as SVGStopElement).setAttribute("offset", `${locationFade1}%`);
      (stops[0] as SVGStopElement).setAttribute("stop-color", this.fadeColor);
      const locationMain = (locationRatio - lengthRatio / 2) * 100;
      (stops[1] as SVGStopElement).setAttribute("offset", `${locationMain}%`);
      (stops[1] as SVGStopElement).setAttribute("stop-color", this.mainColor);
      const locationFade2 = locationRatio * 100;
      (stops[2] as SVGStopElement).setAttribute("offset", `${locationFade2}%`);
      (stops[2] as SVGStopElement).setAttribute("stop-color", this.fadeColor);
    }
  }
  /* SVGグラデーションの設定 */
  private setupGradient() {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    this.gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    if (!this.gradient) return;

    this.gradient.setAttribute("id", "gradient");
    this.gradient.setAttribute("x1", "0%");
    this.gradient.setAttribute("y1", "0%");
    this.gradient.setAttribute("x2", "100%");
    this.gradient.setAttribute("y2", "0%");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", this.fadeColor);
    this.gradient.appendChild(stop1);

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "0%");
    stop2.setAttribute("stop-color", this.mainColor);
    this.gradient.appendChild(stop2);

    const stop3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop3.setAttribute("offset", "0%");
    stop3.setAttribute("stop-color", this.fadeColor);
    this.gradient.appendChild(stop3);

    defs.appendChild(this.gradient);
    this.svg.appendChild(defs);
  }

  /* idを利用してアニメーションを管理、currentTimeを使う */
  private startAnimation() {
    const animate = (currentTime: number) => {
      this.currentTime = currentTime;
      this.drawWind();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  /* 波の高さを返す関数 */
  public getYByX(x: number): number {
    const phase = Math.PI * 2 * this.frequency * (x / this.svg.clientWidth);
    const theta = phase + this.shift;
    const centerOffset = this.svg.clientHeight / 2;
    return this.getAmplitude() * Math.sin(theta) + centerOffset;
  }

  /* 波の線の真ん中をTransformOriginとするので、高さの半分から線の太さの半分を引く */
  public getAmplitude(): number {
    return this.svg.clientHeight / 2 - this.lineWidth / 2;
  }

  /* 周波数をセット　画面に現れる周期の数 */
  public setFrequency(frequency: number) {
    this.frequency = frequency;
  }

  /* 波のズレをセット */
  public setShift(shift: number) {
    this.shift = shift;
  }

  /* 波の線の太さをセット */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  public setMainColor(r: number, g: number, b: number, a: number) {
    this.mainColor = `rgba(${r},${g},${b},${a})`;
  }

  public setFadeColor(r: number, g: number, b: number, a: number) {
    this.fadeColor = `rgba(${r},${g},${b},${a})`;
  }
}
