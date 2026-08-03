import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  label: string;
  path?: string;
}

/** SEO-friendly breadcrumb trail with schema markup. */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template: `
    <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm text-muted">
      <ol class="flex flex-wrap items-center gap-1.5">
        <li>
          <a routerLink="/" class="transition-colors hover:text-secondary">Home</a>
        </li>
        @for (crumb of crumbs(); track crumb.label) {
          <li class="flex items-center gap-1.5">
            <span class="text-muted/50" aria-hidden="true">/</span>
            @if (crumb.path) {
              <a [routerLink]="crumb.path" class="transition-colors hover:text-secondary">{{ crumb.label }}</a>
            } @else {
              <span class="font-semibold text-primary dark:text-white" aria-current="page">{{ crumb.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class AppBreadcrumb {
  readonly crumbs = input<Crumb[]>([]);
}
