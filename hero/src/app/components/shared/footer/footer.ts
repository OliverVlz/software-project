import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
})
export class Footer {

  /** Año actual para mostrar en derechos de autor */
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
} 
