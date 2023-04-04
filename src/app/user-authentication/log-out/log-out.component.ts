import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css'],
})
export class LogOutComponent {
  constructor(
    private userService: BackendUserService,
    private router: Router,
    private errorService: ErrorHandllingService
  ) {}
  logOut() {
    try {
      localStorage.removeItem('logedIn');
      this.userService.logOutUser();
      this.router.navigate(['Home']); 
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
}
