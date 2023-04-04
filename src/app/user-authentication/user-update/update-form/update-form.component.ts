import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';
import { UserSent } from 'src/app/shared/user-sent';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent {
  user: UserSent = {
    login: '',
    password: '',
  };
  token: { token: string } = { token: '' };
  logInForm: FormGroup;
  constructor(
    private userService: BackendUserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorService: ErrorHandllingService
  ) {
    this.logInForm = formBuilder.group({
      name: ['', Validators.required],
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }
 
  async update(user: UserSent) {
    try {
      const result = await this.userService.updateUser(
        user,
        this.userService.getToken(),
        this.userService.userLocal._id
      );
      this.token = result as { token: string };
      this.router.navigateByUrl('board/main');
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
}
