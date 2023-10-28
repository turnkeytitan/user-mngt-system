import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService); // initialize the service before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // check whether service is created successfully
  });

  it('should show toast', (done) => {
    service.getToast().subscribe((toast) => {
      expect(toast).toEqual({ message: 'test', type: 'success' });
      done();
    });

    service.showToast({ message: 'test', type: 'success' });
  });

  it('should hide toast after 3 seconds', (done) => {
    jasmine.clock().install(); // mock timers

    service.getToast().subscribe((toast) => {
      if (toast === null) {
        done();
      }
    });

    service.showToast({ message: 'test', type: 'success' });
    jasmine.clock().tick(3000); // advance time by 3 seconds

    jasmine.clock().uninstall(); // clean up clock mock
  });
});
