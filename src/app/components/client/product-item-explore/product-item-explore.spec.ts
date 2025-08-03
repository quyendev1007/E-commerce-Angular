import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemExplore } from './product-item-explore';

describe('ProductItemExplore', () => {
  let component: ProductItemExplore;
  let fixture: ComponentFixture<ProductItemExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemExplore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemExplore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
