import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { CustomCursor } from './layout/custom-cursor/custom-cursor';
import { AppLoader } from './layout/app-loader/app-loader';
import { BackToTop } from './layout/back-to-top/back-to-top';
import { FloatingCta } from './layout/floating-cta/floating-cta';
import { ScrollProgress } from './layout/scroll-progress/scroll-progress';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CustomCursor, AppLoader, BackToTop, FloatingCta, ScrollProgress],
  template: `
    <app-loader />
    <app-scroll-progress />
    <app-custom-cursor />
    <app-navbar />
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top />
    <app-floating-cta />
  `,
})
export class App {}
