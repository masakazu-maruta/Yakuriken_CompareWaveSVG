export class Wind {
  public readonly svg: SVGSVGElement;
  private lineWidth: number = 0;
  private frequency: number = 0;
  private shift: number = 0;
  private mainColor: string = "";
  private fadeColor: string = "";
  private currentTime: number = 0;
  private createTime: number;
  private pathElement: SVGPathElement;

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
    this.startAnimation();
  }

  /* 風を描画 */
  drawWind() {
    this.pathElement.setAttribute("stroke-width", `${this.lineWidth}`);
    this.pathElement.setAttribute("d", this.generatePathData());
    this.pathElement.setAttribute("stroke", this.coloring());
    this.pathElement.setAttribute("fill", "none");
  }

  /* 色を付ける関数 */
  public coloring(): string {
    const destination = this.svg.clientWidth;
    const time_s = (Date.now() - this.createTime) / 1000;
    const ratio =
      (((destination * time_s) / 8) % (destination * 1.3)) / destination;
    return `url(#gradient)`;
  }

  private generatePathData(): string {
    const pathData: string[] = [];
    const width = this.svg.clientWidth;
    const step = 1;
    pathData.push(`M 0 ${this.getYByX(0)}`);

    for (let x = step; x < width; x += step) {
      const y = this.getYByX(x);
      pathData.push(`L ${x} ${y}`);
    }

    return pathData.join(" ");
  }

  /* SVGグラデーションの設定 */
  private setupGradient() {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", this.fadeColor);
    gradient.appendChild(stop1);

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", this.mainColor);
    gradient.appendChild(stop2);

    const stop3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", this.fadeColor);
    gradient.appendChild(stop3);

    defs.appendChild(gradient);
    this.svg.appendChild(defs);
  }

  /* idを利用してアニメーションを管理、currentTimeを使う */
  private startAnimation() {
    this.setupGradient();
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
