import {Component, OnInit, HostListener} from '@angular/core';
import {LED} from "../../models/color";
import {Color} from "../../models/led";

@Component({
  selector: 'jrl-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  width: number = 32;
  height: number = 32;
  leds: LED[][] = [];
  mouseDown: boolean = false;
  rightClickDown: boolean = false;

  constructor() {}

  ngOnInit() {
    for (let r=0; r<this.width; r++){
      let row = [];
      for (let c=0; c<this.height; c++) {
        row.push(new LED(r, c));
      }
      this.leds.push(row);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
    this.rightClickDown = false;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(){
    event.preventDefault();
    this.mouseDown = false;
    this.rightClickDown = true;
  }

  getOutput(){
    let string = "";
    for (let row of this.leds){
      for (let led of row){
        if (led.active && led.color.hex != "#000000"){
          string += `matrix.drawPixel(${led.row}, ${led.col}, matrix.Color333(${led.color.red}, ${led.color.green}, ${led.color.blue}));\n`
        }
      }
    }
    return string;
  }

}
