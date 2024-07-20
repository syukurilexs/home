import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  init(document: Document, renderer: Renderer2) {
    const themeState: string | null = localStorage.getItem('theme');
    let checked = false;

    if (themeState == 'theme-dark') {
      checked = true;
      this.setDark(document, renderer);
    } else {
      checked = false;
      this.setLight(document, renderer);
    }

    return checked;
  }

  setDark(document: Document, renderer: Renderer2) {
    renderer.setAttribute(document.body, 'class', 'theme-dark');
    localStorage.setItem('theme', 'theme-dark');
  }

  setLight(document: Document, renderer: Renderer2) {
    renderer.setAttribute(document.body, 'class', 'theme-light');
    localStorage.setItem('theme', 'theme-light');
  }
}
