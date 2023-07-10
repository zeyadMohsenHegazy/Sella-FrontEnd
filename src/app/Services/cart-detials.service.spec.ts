import { TestBed } from '@angular/core/testing';

import { CartDetialsService } from './cart-detials.service';

describe('CartDetialsService', () => {
  let service: CartDetialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartDetialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
