const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Ring {
  public readonly svg: SVGSVGElement;
  private duration: number = 0;
  private numberRing: number = 0;
  private lineWidth: number = 0;
  private color: string = "#fff";
  public radius = 50;
  constructor() {
    this.svg = document.createElementNS(SVG_NAMESPACE, "svg") as SVGSVGElement;
  }
  private createRing(
    rx: number,
    ry: number,
    opacity: number,
    durationSec: number,
    rotation: number
  ): SVGGElement {
    const g = document.createElementNS(SVG_NAMESPACE, "g") as SVGGElement;
    const ellipse = document.createElementNS(
      SVG_NAMESPACE,
      "ellipse"
    ) as SVGEllipseElement;
    ellipse.setAttribute("cx", `${0}`);
    ellipse.setAttribute("cy", `${0}`);
    ellipse.setAttribute("rx", `${rx}`);
    ellipse.setAttribute("ry", `${ry}`);
    ellipse.setAttribute("stroke-width", `${this.lineWidth}`);
    ellipse.setAttribute("stroke", this.color);
    ellipse.setAttribute("opacity", `${opacity}`);
    ellipse.setAttribute("fill", "none");

    const animateTransform = document.createElementNS(
      SVG_NAMESPACE,
      "animateTransform"
    ) as SVGAnimateTransformElement;
    animateTransform.setAttribute("attributeName", "transform");
    animateTransform.setAttribute("type", "rotate");
    animateTransform.setAttribute("from", `${rotation} ${0} ${0}`);
    animateTransform.setAttribute("to", `${rotation + 360} ${0} ${0}`);
    animateTransform.setAttribute("dur", `${durationSec}`);
    animateTransform.setAttribute("repeatCount", "indefinite");

    ellipse.appendChild(animateTransform);
    g.appendChild(ellipse);

    return g;
  }

  public updateRings() {
    const halfBoxSize = this.radius + this.lineWidth;
    this.svg.setAttribute(
      "viewBox",
      `${-halfBoxSize} ${-halfBoxSize} ${halfBoxSize * 2} ${halfBoxSize * 2}`
    );
    this.numberRingOptimize();
    for (let i = 0; i < this.numberRing; i++) {
      const g = this.svg.children[i] as SVGAElement;
      if (!g) continue;
      //楕円を変更
      this.updateEllipses(g);
      //アニメーションを変更
      this.updateAnimateTransforms(g, this.numberRing, i);
    }
  }

  private numberRingOptimize() {
    console.log(this.numberRing);
    while (this.svg.childElementCount > this.numberRing) {
      this.svg.lastElementChild?.remove();
    }
    while (this.svg.childElementCount < this.numberRing) {
      const index = this.svg.childElementCount;
      const ratio = index / (this.numberRing * 2);
      const r = this.radius * (1 - ratio * 0.25); //半径
      const g = this.createRing(
        /* rx = */ r * 0.88,
        /* ry = */ r,
        /* opacity = */ 1 - ratio,
        /* durationSec = */ (1 - ratio) * this.duration,
        /* rotation = */ (1 - ratio) * 90
      );
      this.svg.appendChild(g);
    }
  }

  private updateEllipses(g: SVGGElement) {
    const ellipse = g
      .getElementsByTagNameNS(SVG_NAMESPACE, "ellipse")
      .item(0)! as SVGEllipseElement;
    if (ellipse) {
      ellipse.setAttribute("stroke-width", `${this.lineWidth}`);
      ellipse.setAttribute("stroke", this.color);
    }
  }

  private updateAnimateTransforms(
    g: SVGAElement,
    numNodes: number,
    index: number
  ) {
    const animateTransform = g
      .getElementsByTagNameNS(SVG_NAMESPACE, "animateTransform")
      .item(0)! as SVGAnimateTransformElement;
    if (animateTransform) {
      const ratio = index / (numNodes * 2);
      const rotation = ratio * 90;
      animateTransform.setAttribute("dur", `${this.duration * ratio}`);
      animateTransform.setAttribute("from", `${rotation} ${0} ${0}`);
      animateTransform.setAttribute("to", `${rotation + 360} ${0} ${0}`);
    }
  }

  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  public setNumberRing(numberRing: number) {
    this.numberRing = numberRing;
  }

  public setColor(color: string) {
    this.color = color;
  }
  public setDuration(duration: number) {
    this.duration = duration;
  }
}
