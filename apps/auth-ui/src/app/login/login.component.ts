import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import store from 'store2';

import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [AuthService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPageComponent implements OnInit {
  username = new FormControl();
  password = new FormControl();

  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: (response: any) => {
        // Store the user's authentication token in local storage.
        store.set('access-token', response.accessToken);

        // Redirect the user to the home page.
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Display an error message to the user.
        this.snackbar.open('Login failed', 'OK', { duration: 4000 });
      },
    });
  }
}
