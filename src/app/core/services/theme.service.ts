import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly isDark = signal(false);
  readonly cursorEnabled = signal(true);

  constructor() {
    effect(() => {
      this.document.body.classList.toggle('dark', this.isDark());
    });
  }

  toggleTheme(): void {
    this.isDark.update((v) => !v);
  }
}
