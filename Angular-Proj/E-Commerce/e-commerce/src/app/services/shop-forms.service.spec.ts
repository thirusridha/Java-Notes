import { TestBed } from '@angular/core/testing';

import { ShopFormsService } from './shop-forms.service';

describe('ShopFormsService', () => {
  let service: ShopFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
