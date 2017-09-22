import {Component, OnInit, Input, HostListener} from '@angular/core';
import {LED} from "../../../models/led";
import {Color} from "../../../models/color";
import {Subscription} from "rxjs";
import {RgbService} from "../../../services/rgb.service";

@Component({
  selector: 'jrl-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LedComponent implements OnInit {
  @Input() led: LED;
  @Input() mouseDown: boolean = false;
  @Input() rightClickDown: boolean = false;

  selectedColor: Color = new Color(0, 0, 0);
  subscription: Subscription;


  constructor(private rgbService: RgbService) {
    this.subscription = this.rgbService.getSelectedColor().subscribe(color => {
      this.selectedColor = color;
    });
  }

  ngOnInit() {
  }

  getStyle(){
    if (this.led.active){
      return {"background-color": this.led.color.hex};
    } return {"background-color": "#000000"};
  }

  setLED(){
    this.led.active = true;
    this.led.color = this.selectedColor;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown){
      this.setLED();
    } else if (this.rightClickDown){
      this.deactivateLED();
    }
  }

  @HostListener('contextmenu', ['$event'])
  deactivateLED(){
    event.preventDefault();
    this.mouseDown = false;
    this.led.active = false;
  }

}
