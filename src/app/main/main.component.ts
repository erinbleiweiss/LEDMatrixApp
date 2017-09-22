import { Component, OnInit } from '@angular/core';
import {LED} from "../models/led";
import {Color} from "../models/color";
import * as _ from "lodash";

@Component({
  selector: 'jrl-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  width: number = 32;
  height: number = 32;
  currentMatrix: number = 0;
  matrices: LED[][][] = [];

  constructor() { }

  ngOnInit() {
    this.matrices.push(this.generateNewMatrix());
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
    for (let matrix of this.matrices) {
      for (let row of matrix) {
        for (let led of row) {
          if (led.active && led.color.hex != "#000000") {
            string += `matrix.drawPixel(${led.row}, ${led.col}, matrix.Color333(${led.color.red}, ${led.color.green}, ${led.color.blue}));\n`
          }
        }
      }
      string += `delay(500);\n`;
      string += `matrix.fillScreen(matrix.Color333(0, 0, 0));\n`;
    }
    return string;
  }

  moveDown(){
    let currentMatrix = this.matrices[this.currentMatrix];
    let prevRow;
    for (let row=0; row<currentMatrix.length; row++){
      let rowCopy = _.cloneDeep(currentMatrix[row]);
      for (let col=0; col<currentMatrix[row].length; col++){
        if (prevRow){
          currentMatrix[row][col].active = prevRow[col].active;
          currentMatrix[row][col].color = prevRow[col].color;
        } else {
          currentMatrix[row][col].active = false;
          currentMatrix[row][col].color = new Color(0, 0, 0);
        }
      }
      prevRow = rowCopy;
    }
  }

  moveUp(){
    let currentMatrix = this.matrices[this.currentMatrix];
    let nextRow;
    for (let row=0; row<currentMatrix.length; row++){
      for (let col=0; col<currentMatrix[row].length; col++){
        if (row != currentMatrix.length-1){
          nextRow = _.cloneDeep(currentMatrix[row+1]);
          currentMatrix[row][col].active = nextRow[col].active;
          currentMatrix[row][col].color = nextRow[col].color;
        } else {
          currentMatrix[row][col].active = false;
          currentMatrix[row][col].color = new Color(0, 0, 0);
        }
      }
    }
  }

  moveLeft(){
    let currentMatrix = this.matrices[this.currentMatrix];
    let copy = _.cloneDeep(currentMatrix);

    for (let row=0; row<currentMatrix.length; row++) {


    }
      // for (let row=0; row<currentMatrix.length; row++) {
    //
    //   for (let col=0; col<currentMatrix[row].length; col++){
    //
    //
    //   }
    // }

  }

  add(){
    this.matrices.push(this.generateNewMatrix());
    this.currentMatrix++;
  }


}
