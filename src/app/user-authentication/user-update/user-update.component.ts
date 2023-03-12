import { Component } from '@angular/core';
import { BackendUserService } from 'src/app/shared/backend-user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {
  constructor(private userService: BackendUserService) {
    this.getUser();
  }
  getUser() {
    console.log(this.userService.getToken(), this.userService.userLocal);
  }
}
