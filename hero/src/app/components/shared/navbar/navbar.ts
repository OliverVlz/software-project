import { Component, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  /** Estado reactivo para controlar el modo oscuro */
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Inicializar tema desde localStorage o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

    this.applyTheme();

    // Aplicar tema automáticamente cuando cambie
    effect(() => {
      this.applyTheme();
    });
  }

  /** Alterna entre modo claro y oscuro */
  toggleTheme() {
    this.isDarkMode.update(value => !value);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  /** Aplica el tema actual al documento */
  private applyTheme() {
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
