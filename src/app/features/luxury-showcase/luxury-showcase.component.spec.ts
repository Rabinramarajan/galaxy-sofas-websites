import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LuxuryShowcaseComponent } from './luxury-showcase.component';
import { LuxuryShowcaseService } from '../../core/services/luxury-showcase.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LuxuryShowcaseComponent', () => {
  let component: LuxuryShowcaseComponent;
  let fixture: ComponentFixture<LuxuryShowcaseComponent>;
  let service: LuxuryShowcaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxuryShowcaseComponent],
      providers: [
        LuxuryShowcaseService,
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LuxuryShowcaseComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LuxuryShowcaseService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items by category using Signals', () => {
    service.setCategory('living');
    fixture.detectChanges();
    const items = service.filteredItems();
    expect(items.every(item => item.category === 'living')).toBe(true);
  });

  it('should update search query signal and filter items', () => {
    service.setSearchQuery('Aethelgard');
    fixture.detectChanges();
    const items = service.filteredItems();
    expect(items.length).toBe(1);
    expect(items[0]!.title).toContain('Aethelgard');
  });

  it('should open and close item modal using selectedItemId signal', () => {
    const item = service.furnitureItems()[0]!;
    component.openModal(item);
    expect(service.selectedItemId()).toBe('gs-001');

    component.closeModal();
    expect(service.selectedItemId()).toBeNull();
  });
});
