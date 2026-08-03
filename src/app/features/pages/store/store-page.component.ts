import { Component } from '@angular/core';
import { ContentPageComponent } from '../content/content-page.component';

@Component({
  selector: 'gs-store-page',
  standalone: true,
  imports: [ContentPageComponent],
  template: `<gs-content-page />`
})
export class StorePageComponent {}
