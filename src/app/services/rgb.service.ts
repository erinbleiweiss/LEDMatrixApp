import { Injectable } from '@angular/core';
import {Color} from "../models/led";
import {Subject, Observable} from "rxjs";

@Injectable()
export class RgbService {

  private subject = new Subject<Color>();

  constructor() { }

  setSelectedColor(color: Color){
    this.subject.next(color);
  }

  getSelectedColor(): Observable<any> {
    return this.subject.asObservable();
  }

}
