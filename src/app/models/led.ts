import {Color} from "./color";

export class LED {
  row: number;
  col: number;
  color: Color;
  active: boolean;

  constructor(row, col){
    this.row = row;
    this.col = col;
    this.color = new Color(0, 0, 0);
    this.active = false;
  }

}
