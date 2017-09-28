import { Component, OnInit } from '@angular/core';
import {Color} from "../../models/color";
import {RgbService} from "../../services/rgb.service";

@Component({
  selector: 'jrl-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {
  colorRange = 7;
  colors: Color[] = [];

  constructor(private rgbService: RgbService) { }

  ngOnInit() {
    let unsortedColors = [];

    for (let r=0; r<=this.colorRange; r++){
      for (let b=0; b<=this.colorRange; b++){
        for (let g=0; g<=this.colorRange; g++){
          if ((r !== g && g !== b) || (r == this.colorRange && g == this.colorRange && b == this.colorRange)){
            unsortedColors.push(new Color(r, g, b));
          }
        }
      }
    }

    this.colors = unsortedColors.map((c: Color, i: number) => {
      return {color: this.rgbToHsl(c), index: i};
    }).sort((c1, c2) => {
      return c1.color[0] - c2.color[0];
    }).map(data => {
      return unsortedColors[data.index];
    });

  }

  rgbToHsl(color: Color){
    let red = parseInt(color.hex.substring(1,3),16)/255;
    let green = parseInt(color.hex.substring(3,5),26)/255;
    let blue = parseInt(color.hex.substring(5,7),16)/255;

    let hue, saturation, lightness;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);

    lightness = (max + min) / 2;

    if (max == min){
      hue = saturation = 0;
    } else {
      let delta = max - min;
      saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case red:
          hue = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / delta + 2;
          break;
        case blue:
          hue = (red - green) / delta + 4;
          break;
      }
      hue /= 6;
    }
    return [hue * 360, saturation * 100, lightness * 100];
  }

  setSelectedColor(color: Color){
    this.rgbService.setSelectedColor(color);
  }



}
