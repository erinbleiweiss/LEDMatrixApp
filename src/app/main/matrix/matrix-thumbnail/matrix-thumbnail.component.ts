import {Component, OnInit, Input} from '@angular/core';
import {LED} from "../../../models/led";

@Component({
  selector: 'jrl-matrix-thumbnail',
  templateUrl: './matrix-thumbnail.component.html',
  styleUrls: ['./matrix-thumbnail.component.css']
})
export class MatrixThumbnailComponent implements OnInit {

  @Input() matrix: LED[][];

  constructor() { }

  ngOnInit() {
  }

  getColor(led){
    if (led.active){
      return {'background-color': led.color.hex};
    } else {
      return {'background-color': '#000000'};
    }
  }

}
