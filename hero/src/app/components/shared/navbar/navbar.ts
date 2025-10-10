import { Component, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    
    // Aplicar el tema inicial
    this.applyTheme();
    
    // Efecto para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme();
    });
  }

  toggleTheme() {
    this.isDarkMode.update(value => !value);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  private applyTheme() {
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
