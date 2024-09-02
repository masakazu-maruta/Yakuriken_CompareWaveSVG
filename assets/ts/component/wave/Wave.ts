export class Wave {
  public readonly svg: SVGSVGElement;
  private lineWidth: number = 0;
  private frequency: number = 0;
  private shift: number = 0;
  private speed: number = 0;
  private color: string = "";
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

  /* 時間差をつかって波を描画 */
  public drawWave() {
    this.pathElement.setAttribute("stroke-width", `${this.lineWidth}`);
    this.pathElement.setAttribute("stroke", this.color);
    this.pathElement.setAttribute("fill", "none");
    this.pathElement.setAttribute("d", this.generatePathData());
  }

  private generatePathData(): string {
    const pathData: string[] = [];
    const width = this.svg.clientWidth;
    pathData.push(`M 0 ${this.getYByX(0)}`);
    const step = 1; // パスのセグメントのステップを増やすことでパフォーマンスを向上させる
    for (let x = step; x < width; x += step) {
      const y = this.getYByX(x);
      pathData.push(`L ${x} ${y}`);
    }

    return pathData.join(" ");
  }

  /* idを利用してアニメーションを管理、currentTimeを使う */
  private startAnimation() {
    const animate = (currentTime: number) => {
      this.currentTime = currentTime;
      this.drawWave();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  /* 波の高さを返す関数　時間の情報を使って波をずらす */
  public getYByX(x: number): number {
    const phase = this.frequency * Math.PI * 2 * (x / this.svg.clientWidth);
    const speedEffect =
      (-this.speed * (this.currentTime - this.createTime)) / 1000;
    const theta = phase + speedEffect + this.shift;
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

  /* 波のスピードをセット */
  public setSpeed(speed: number) {
    this.speed = speed;
  }

  /* 波の線の太さをセット */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  /* 波の色をセット */
  public setColor(r: number, g: number, b: number, a: number) {
    this.color = `rgba(${r},${g},${b},${a})`;
  }
}
