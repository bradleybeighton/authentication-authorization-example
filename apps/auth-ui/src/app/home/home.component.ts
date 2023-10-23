import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  backendUrl: string;
  isAuthenticated: boolean = false;
  username: string = '';

  constructor(
    private authService: AuthService,
    @Inject('BACKEND_URL') backendUrl: string,
    private http: HttpClient
  ) {
    this.backendUrl = backendUrl;
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.username = this.authService.getUsername();
    const sub = this.getData().subscribe(() => {
      sub.unsubscribe();
    });
  }

  getData() {
    return this.http.get(`${this.backendUrl}`);
  }

  signOut() {
    this.authService.signOut();
  }
}
