import { Component, input, model } from '@angular/core';

@Component({
  selector: 'gs-before-after',
  standalone: true,
  template: `
    <section class="glass-card p-5">
      <div class="relative h-72 overflow-hidden rounded-2xl">
        <img class="absolute inset-0 h-full w-full object-cover" [src]="afterImage()" alt="After interior" loading="lazy" />
        <div class="absolute inset-y-0 left-0 overflow-hidden" [style.width.%]="position()">
          <img class="h-full w-full object-cover" [src]="beforeImage()" alt="Before interior" loading="lazy" />
        </div>
      </div>
      <input class="mt-4 w-full" type="range" min="10" max="90" [value]="position()" (input)="onInput($event)" aria-label="Before and after slider"/>
    </section>
  `,
  host: { class: 'block' }
})
export class BeforeAfterComponent {
  readonly beforeImage = input.required<string>();
  readonly afterImage = input.required<string>();
  readonly position = model(50);

  onInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 50);
    this.position.set(value);
  }
}
