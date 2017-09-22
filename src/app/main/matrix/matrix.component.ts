import {Component, OnInit, HostListener, Input} from '@angular/core';
import {LED} from "../../models/led";

@Component({
  selector: 'jrl-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  mouseDown: boolean = false;
  rightClickDown: boolean = false;

  @Input() matrix: LED[][] = [];

  constructor() {}

  ngOnInit() {

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

}
