import { Directive, HostBinding, HostListener, signal } from '@angular/core';

@Directive({
  selector: '[gsMagnetic]',
  standalone: true
})
export class MagneticDirective {
  private readonly x = signal(0);
  private readonly y = signal(0);

  @HostBinding('style.transform')
  get transform(): string {
    return `translate3d(${this.x()}px, ${this.y()}px, 0)`;
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.x.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
    this.y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  }

  @HostListener('mouseleave')
  reset(): void {
    this.x.set(0);
    this.y.set(0);
  }
}
