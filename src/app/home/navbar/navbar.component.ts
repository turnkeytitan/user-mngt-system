import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  logout$: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.logout$ = EMPTY_SUBSCRIPTION;
  }
  ngOnDestroy(): void {
    this.logout$.unsubscribe();
  }
  logout() {
    this.logout$ = this.auth.logOut().subscribe();
    this.router.navigate(['login']);
  }
}
