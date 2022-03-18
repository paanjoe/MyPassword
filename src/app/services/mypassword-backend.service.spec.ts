import { TestBed } from '@angular/core/testing';

import { MypasswordBackendService } from './mypassword-backend.service';

describe('MypasswordBackendService', () => {
  let service: MypasswordBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MypasswordBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
