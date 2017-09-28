import { Component, OnInit } from '@angular/core';
import {LED} from "../models/led";
import {Color} from "../models/color";
import { saveAs } from 'file-saver';
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
    for (let row=0; row<currentMatrix[0].length; row++) {
      for (let col=0; col<currentMatrix[row].length; col++) {
        if (col != currentMatrix[row].length - 1){
          let nextLED = currentMatrix[row][col+1];
          currentMatrix[row][col].active = nextLED.active;
          currentMatrix[row][col].color = nextLED.color;
        } else {
          currentMatrix[row][col].active = false;
          currentMatrix[row][col].color = new Color(0, 0, 0);
        }
      }
    }
  }

  moveRight(){
    let currentMatrix = this.matrices[this.currentMatrix];
    let prevLED;
    for (let row=0; row<currentMatrix[0].length; row++) {
      for (let col=0; col<currentMatrix[row].length; col++) {
        let ledCopy = _.cloneDeep(currentMatrix[row][col]);
        if (col != 0){
          currentMatrix[row][col].active = prevLED.active;
          currentMatrix[row][col].color = prevLED.color;
        } else {
          currentMatrix[row][col].active = false;
          currentMatrix[row][col].color = new Color(0, 0, 0);
        }
        prevLED = ledCopy;
      }
    }
  }

  select(i){
    this.currentMatrix = i;
  }

  reset(){
    let currentMatrix = this.matrices[this.currentMatrix];
    for (let row=0; row<currentMatrix.length; row++){
      for (let col=0; col<currentMatrix[row].length; col++) {
          currentMatrix[row][col].active = false;
          currentMatrix[row][col].color = new Color(0, 0, 0);
      }
    }

  }

  copy(){
    let newMatrix = _.cloneDeep(this.matrices[this.currentMatrix]);
    this.matrices.splice(this.currentMatrix+1, 0, newMatrix);
    this.currentMatrix++;
  }

  add(){
    this.matrices.splice(this.currentMatrix+1, 0, this.generateNewMatrix());
    this.currentMatrix++;
  }

  remove(){
    if (this.matrices.length > 1) {
      this.matrices.splice(this.currentMatrix, 1);
      this.currentMatrix = Math.max(this.currentMatrix - 1, 0);
    }
  }

  save(){
    let data = JSON.stringify(this.matrices);
    let blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, "led_matrix.json");
  }

  upload(event){
    let file = event.target.files[0];
    let reader: FileReader = new FileReader();
    let fileType = event.target.parentElement.id;
    reader.onloadend = (e) => {
      let obj = JSON.parse(reader.result);

      for (let matrix of obj){
        for (let row of matrix){
          for (let led of row){
            let new_led = new LED(led.row, led.col);
            new_led.color = led.color;
            new_led.active = led.active;
            led = new_led;
          }
        }
      }
      this.matrices = obj;

    };

    reader.readAsText(file);

  }


}
