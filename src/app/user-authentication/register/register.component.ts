import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';
import { UserReceived } from 'src/app/shared/user-received';
import { UserSent } from 'src/app/shared/user-sent';
import { BackendUserService } from '../../shared/backend-user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: UserSent = {
    login: '',
    password: '',
  };
  currUser: UserReceived = {
    login: '',
    name: '',
    _id: '',
  };
  token: { token: string } = { token: '' };
  registerForm: FormGroup;
  constructor(
    private userService: BackendUserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorService: ErrorHandllingService
  ) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }
  async registerUser(user: UserSent) {
    try {
      this.user = { ...user };
      const currUser: UserSent = {
        login: user.login,
        password: user.password,
      };
      const result = (await this.userService.registerUser(
        this.user
      )) as UserSent;

      this.signIn(currUser);
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
  async signIn(user: UserSent) {
    try {
      const result = await this.userService.loginUser(user);
      this.token = result as { token: string };

      this.router.navigateByUrl('board/main');
    } catch (error) {
      this.errorService.generateError(error);
    }
  }
}
