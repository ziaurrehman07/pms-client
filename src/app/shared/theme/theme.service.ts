import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    this.currentTheme = savedTheme ? savedTheme : 'light';
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.currentTheme === 'dark');
    localStorage.setItem('theme', this.currentTheme);
  }

  get current() {
    return this.currentTheme;
  }
}
