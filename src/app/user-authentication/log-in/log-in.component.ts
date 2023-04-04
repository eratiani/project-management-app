import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';
import { UserSent } from 'src/app/shared/user-sent';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
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
    this.logInForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  async loginUser(user: UserSent) {
    try {
      const result = await this.userService.loginUser(user);
      this.token = result as { token: string };
      this.router.navigateByUrl('board/main');
    } catch (err: any) {
      this.errorService.generateError(err);
    }
  }
}
