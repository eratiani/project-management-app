import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
      console.log(result);

      this.signIn(currUser);
    } catch (error) {
      console.log(error);
    }
  }
  async signIn(user: UserSent) {
    try {
      const result = await this.userService.loginUser(user);
      this.token = result as { token: string };
      console.log(this.token);
      this.router.navigateByUrl('board/main');
    } catch (error) {
      console.log(error);
    }
  }
}
