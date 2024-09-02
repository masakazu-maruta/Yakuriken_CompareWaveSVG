import { Color } from "../../util/color";
import { Formula } from "../../util/formula";
import { Wave } from "./Wave";
interface Transform {
  x: number;
  y: number;
}
export class WaveElement extends HTMLElement {
  private wave: Wave;
  private width: number = 0;
  private height: number = 0;
  private degree: number = 0;
  /* 属性値の種類 */
  static get observedAttributes() {
    return [
      "x1",
      "y1",
      "x2",
      "y2",
      "amplitude",
      "frequency",
      "shift",
      "line-width",
      "speed",
      "color",
    ];
  }
  /* Waveキャンバスとスタイルを適用して子要素にする */
  /* WARNING : superのコンストラクタは必ず最初に呼ぶ */
  constructor() {
    super();
    this.wave = new Wave();
    const style = document.createElement("style");
    style.textContent = `
    :host {
      position : absolute;
      display: block;
      }
      canvas {
        display: block;
        height : 100%;
        width : 100%;
        }
        `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.wave.svg);
    this.shadowRoot?.appendChild(style);
    this.updateWaveSetting();
  }

  connectedCallback() {
    console.log("WaveElement connectedCallback");
  }

  disconnectedCallback() {
    console.log("WaveElement disconnectedCallback");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);
    this.updateWaveSetting();
  }

  //属性値から、shadowRootの高さと見た目、波のセッターをいじる
  private updateWaveSetting() {
    // 属性から設定値を取得
    const startNode: Transform = {
      x: this.getFloatAttribute("x1"),
      y: this.getFloatAttribute("y1"),
    };
    const stopNode: Transform = {
      x: this.getFloatAttribute("x2"),
      y: this.getFloatAttribute("y2"),
    };
    const color: Color = this.getColorAttribute("color");
    const amplitude: number = this.getFloatAttribute("amplitude");
    const frequency: number = this.getFloatAttribute("frequency");
    const shift: number = this.getFloatAttribute("shift");
    const lineWidth: number = this.getFloatAttribute("line-width");
    const speed: number = this.getFloatAttribute("speed");

    // Wave インスタンスの設定
    this.setHeight(amplitude);
    this.updateAppearanceBTwoPoints(startNode, stopNode);
    this.wave.setFrequency(frequency);
    this.wave.setShift(shift);
    this.wave.setSpeed(speed);
    this.wave.setLineWidth(lineWidth);
    this.wave.setColor(color.r, color.g, color.b, color.a);
  }
  /* 実数の属性をゲット */
  private getFloatAttribute(value: string): number {
    return parseFloat(this.getAttribute(value) || "0");
  }
  /* 色の属性をゲット */
  private getColorAttribute(value: string): Color {
    // 要素の "color" 属性を取得
    const color = this.getAttribute(value);
    // 色の属性が存在する場合
    if (color) {
      // 色の値をカンマで分割して配列に変換
      const parts = color.split(",").map((part) => {
        const num = Number(part);
        return !isNaN(num) ? num : null; // 数値に変換できなければ null を返す
      });

      // 色の成分がすべて数値であることを確認
      const [r, g, b, a] = parts;
      if (r !== null && g !== null && b !== null && a !== null) {
        // Color オブジェクトを作成し、返す
        return new Color(r, g, b, a);
      }
    }
    // 色の属性が存在しないか、無効な値の場合は 白 を返す
    return new Color(255, 255, 255, 1);
  }

  /* 最初の点、目標の点にあわせて波の 長さ 角度 座標 を更新 */
  public updateAppearanceBTwoPoints(startNode: Transform, stopNode: Transform) {
    /* 長さを求める */
    const width = Formula.distanceBetweenPoints(startNode, stopNode);
    this.setWidth(width);
    /* 角度をもとめる */
    const degree = Formula.AngleBetweenPoints(startNode, stopNode);
    this.setRotate(degree);
    /* 座標を求める */
    /* WARNING : 先に横幅と角度を計算する必要がある */
    this.setTransform(startNode);
  }

  /* REVIEW : さらに疎結合にできる余地あり*/
  /* 回転に合わせて、左端をx1,y1の座標に移動する */
  public setTransform(node: Transform) {
    /* 角度、半分の高さと横幅をセット */
    const radian = (this.degree * Math.PI) / 180;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    /* 適切に移動をさせるための情報 */
    const offsetX: number = -(halfWidth - halfWidth * Math.cos(radian));
    const offsetY: number = halfWidth * Math.sin(radian) - halfHeight;
    /* 代入 */
    this.style.left = `${node.x + offsetX}px`;
    this.style.top = `${node.y + offsetY}px`;
  }
  /* 横幅を変数とスタイルにセット */
  public setWidth(width: number) {
    this.width = width;
    this.style.width = `${width}px`;
  }
  /* 高さを変数とスタイルにセット */
  public setHeight(height: number) {
    this.height = height;
    this.style.height = `${height}px`;
  }
  /* 回転(deg)を変数とスタイルにセット */
  public setRotate(degree: number) {
    this.degree = degree;
    this.style.rotate = `${degree}deg`;
  }
}
