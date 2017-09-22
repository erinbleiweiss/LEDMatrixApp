import { Component, OnInit } from '@angular/core';
import {LED} from "../models/led";

@Component({
  selector: 'jrl-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  width: number = 32;
  height: number = 32;
  currentMatrix: LED[][] = [];
  matricies: LED[][][] = [];

  constructor() { }

  ngOnInit() {
    this.currentMatrix = this.generateNewMatrix();
    this.matricies.push(this.currentMatrix);
  }

  generateNewMatrix(){
    let matrix: LED[][] = [];
    for (let r=0; r<this.width; r++){
      let row = [];
      for (let c=0; c<this.height; c++) {
        row.push(new LED(r, c));
      }
      matrix.push(row);
    }
    return matrix;
  }

  getOutput(){
    let string = "";
    for (let row of this.currentMatrix){
      for (let led of row){
        if (led.active && led.color.hex != "#000000"){
          string += `matrix.drawPixel(${led.row}, ${led.col}, matrix.Color333(${led.color.red}, ${led.color.green}, ${led.color.blue}));\n`
        }
      }
    }
    return string;
  }

}
