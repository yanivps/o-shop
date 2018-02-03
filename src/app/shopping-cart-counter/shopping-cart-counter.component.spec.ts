import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartCounterComponent } from './shopping-cart-counter.component';

describe('ShoppingCartCounterComponent', () => {
  let component: ShoppingCartCounterComponent;
  let fixture: ComponentFixture<ShoppingCartCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
