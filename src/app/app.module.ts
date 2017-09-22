import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MatrixComponent } from './main/matrix/matrix.component';
import { ColorPaletteComponent } from './main/color-palette/color-palette.component';
import { LedComponent } from './main/matrix/led/led.component';
import { ColorComponent } from './main/color-palette/color/color.component';
import { EnumeratePipe } from './pipes/enumerate.pipe';
import { RgbService } from "./services/rgb.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MatrixComponent,
    ColorPaletteComponent,
    LedComponent,
    ColorComponent,
    EnumeratePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [RgbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
