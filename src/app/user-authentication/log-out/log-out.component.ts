import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/backend-user.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css'],
})
export class LogOutComponent {
  constructor(
    private userService: BackendUserService,
    private router: Router
  ) {}
  logOut() {
    try {
      this.userService.logOutUser();
      this.router.navigateByUrl('Home');
    } catch (error) {
      console.log(error);
    }
  }
}
