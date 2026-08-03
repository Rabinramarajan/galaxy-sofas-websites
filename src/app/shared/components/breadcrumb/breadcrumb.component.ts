import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'gs-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="mb-6 text-sm" aria-label="Breadcrumb">
      <ol class="flex flex-wrap items-center gap-2 text-slate-500">
        <li><a routerLink="/" class="hover:text-amber-600">Home</a></li>
        @for (item of crumbs(); track item.path) {
          <li>/</li>
          <li><a [routerLink]="item.path" class="hover:text-amber-600">{{ item.label }}</a></li>
        }
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  private readonly route = inject(ActivatedRoute);
  readonly crumbs = computed(() => {
    const parts = this.route.snapshot.url.map((segment) => segment.path).filter(Boolean);
    return parts.map((part, index) => ({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, (v) => v.toUpperCase()),
      path: '/' + parts.slice(0, index + 1).join('/')
    }));
  });
}
