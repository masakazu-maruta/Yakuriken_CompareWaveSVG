const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export class Gradient {
  public readonly svg: SVGSVGElement;
  public readonly ellipse: SVGEllipseElement;
  private stop1: SVGStopElement;
  private stop2: SVGStopElement;
  private color1: string;
  private color2: string;
  constructor() {
    this.svg = document.createElementNS(SVG_NAMESPACE, "svg") as SVGSVGElement;
    this.svg.setAttribute("viewBox", `-50 -50 100 100`);
    this.ellipse = document.createElementNS(
      SVG_NAMESPACE,
      "ellipse"
    ) as SVGEllipseElement;
    this.ellipse.setAttribute("rx", "50");
    this.ellipse.setAttribute("ry", "30");
    this.createSVG();
  }

  public createSVG() {
    const url = SVG_NAMESPACE;
    this.svg.setAttribute("xmlns", url);
    // defs 要素を作成
    const defs = document.createElementNS(url, "defs");
    // linearGradient 要素を作成
    const linearGradient = document.createElementNS(url, "linearGradient");
    linearGradient.setAttribute("id", "bg-grad");
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "100%");
    // stop 要素を作成
    this.stop1 = document.createElementNS(url, "stop");
    this.stop1.setAttribute("offset", "0%");
    this.stop1.setAttribute("stop-color", this.color1 ?? "#fff");
    this.stop2 = document.createElementNS(url, "stop");
    this.stop2.setAttribute("offset", "100%");
    this.stop2.setAttribute("stop-color", this.color2 ?? "#fff");
    // stop 要素を linearGradient に追加
    linearGradient.appendChild(this.stop1);
    linearGradient.appendChild(this.stop2);
    // defs 要素に linearGradient を追加
    defs.appendChild(linearGradient);
    // SVG 要素に defs と ellipse を追加
    this.svg.appendChild(defs);
    // ellipse 要素を作成
    this.ellipse.setAttribute("fill", "url(#bg-grad)");
    this.svg.appendChild(this.ellipse);
  }

  public updateSVG() {
    this.stop1.setAttribute("stop-color", this.color1 ?? "#fff");
    this.stop2.setAttribute("stop-color", this.color2 ?? "#fff");
  }

  public setColor1(color: string) {
    this.color1 = color;
  }
  public setColor2(color: string) {
    this.color2 = color;
  }
}
