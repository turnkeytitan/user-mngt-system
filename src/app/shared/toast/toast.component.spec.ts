import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from '@core/services/toast/toast.service';
import { Observable, of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [ToastService],
    }).compileComponents();
    toastService = TestBed.inject(ToastService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.toast).toBeInstanceOf(Observable);
  });

  it('should close the toast', fakeAsync(() => {
    component.toast = of({
      type: 'success',
      message: 'test',
    });
    fixture.detectChanges();
    tick(0);
    const toast = document.querySelector('.toast') as HTMLDivElement;
    const closeToast = spyOn(component, 'closeToast');

    toast.click();
    component.closeToast();
    expect(closeToast).toHaveBeenCalled();
  }));
});
