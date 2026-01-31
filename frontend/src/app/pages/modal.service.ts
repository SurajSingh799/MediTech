// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private signupSubject = new Subject<boolean>();
  private loginSubject = new Subject<boolean>();

  signupModal$ = this.signupSubject.asObservable();
  loginModal$ = this.loginSubject.asObservable();

  openSignup() {
    this.signupSubject.next(true);
  }

  openLogin() {
    this.loginSubject.next(true);
  }

  closeModals() {
    this.signupSubject.next(false);
    this.loginSubject.next(false);
  }
}