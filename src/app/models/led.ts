export class Color {
  red: number;
  green: number;
  blue: number;
  hex: string;

  constructor(red, green, blue, colorRange=7){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.hex = this.rgbToHex(colorRange);
  }

  rgbToHex(colorRange){
    let hexRed = ("00" + ((255/colorRange) * this.red).toString(16)).slice(-2);
    let hexGreen = ("00" + ((255/colorRange) * this.green).toString(16)).slice(-2);
    let hexBlue = ("00" + ((255/colorRange) * this.blue).toString(16)).slice(-2);
    return `#${hexRed}${hexGreen}${hexBlue}`;
  }

}
