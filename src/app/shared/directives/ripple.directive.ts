import { Directive, ElementRef, HostListener, inject, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() rippleColor: string = 'light';

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = this.el.nativeElement as HTMLElement;
    const rect = target.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const circle = this.renderer.createElement('span');
    this.renderer.setStyle(circle, 'width', `${diameter}px`);
    this.renderer.setStyle(circle, 'height', `${diameter}px`);
    this.renderer.setStyle(circle, 'left', `${event.clientX - rect.left - radius}px`);
    this.renderer.setStyle(circle, 'top', `${event.clientY - rect.top - radius}px`);
    this.renderer.addClass(circle, 'luxury-ripple-effect');

    const existing = target.getElementsByClassName('luxury-ripple-effect')[0];
    if (existing) {
      existing.remove();
    }

    this.renderer.appendChild(target, circle);
    setTimeout(() => {
      circle.remove();
    }, 600);
  }
}
