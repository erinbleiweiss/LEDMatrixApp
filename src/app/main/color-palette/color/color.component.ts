import {Component, OnInit, Input} from '@angular/core';
import {Color} from "../../../models/color";

@Component({
  selector: 'jrl-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  @Input() color: Color;

  constructor() { }

  ngOnInit() {
  }

  getColor(){
    return {"color": this.color.hex}
  }

}
