import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../model/auth';
import { User } from '../model/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public avail: boolean = false;
  public msg: string = "";

  private isAuthenticated = false;
  private authToken: string | null = null;
  private readonly TOKEN_KEY = 'token_Data';
  private readonly USER_DATA_KEY = 'USER_Data';
  private readonly SESSION_EXPIRY_KEY = 'sessionExpiryData';
  private readonly SESSION_DURATION = 5 * 24 * 60 * 60 * 1000; // 5 days

  // API URL for GraphQL
  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  // User registration method using GraphQL
  createUser(user: User): Observable<any> {
    console.log('createUser method called'); // Debug log

    // GraphQL Mutation for User Creation
    const mutation = `
      mutation {
        createUser(username: "${user.name}", email: "${user.email}", password: "${user.password}") {
          id
          username
          email
          created_at
          updated_at
        }
      }
    `;

    // Send the GraphQL request
    return this.http.post<any>(this.apiURL, { query: mutation }).pipe(
      tap(response => {
        if (response.data) {
          console.log('User registered successfully:', response.data.createUser);
        }
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        this.msg = 'Registration failed. Please try again.';
        return of(error);  // Return error to avoid breaking the stream
      })
    );
  }

  // Login method using GraphQL
  loginUser(email: string, password: string): Observable<Auth> {
    console.log('loginUser method called');  // Debug log

    // GraphQL Mutation for Login
    const mutation = `
      mutation {
        login(email: "${email}", password: "${password}") {
          id
          email
        }
      }
    `;
    
    // Send the GraphQL request
      return this.http.post<Auth>(`${this.apiURL}`, { query: mutation })
      .pipe(
        tap(user => {
          if (user.token) {
            this.setUserSession(user);
          }
        })
      );
  }

  // Session management methods
  private setUserSession(user: Auth): void {
    if (user.token) {
      const data = {
        name: user.name,
        email: user.email,
        token: user.token,
        userId: user.userId,
      };
      this.authToken = user.token;
      this.setStorageItem(this.TOKEN_KEY, user.token);
      this.setStorageItem(this.USER_DATA_KEY, JSON.stringify(data));
      this.setSessionExpiry();
      this.isAuthenticated = true;
    } else {
      console.error('User token is undefined');
      this.isAuthenticated = false;
    }
  }

  private setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  private removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private setSessionExpiry(): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  }

  private checkSessionExpiry(): void {
    const expiryTime = sessionStorage.getItem(this.SESSION_EXPIRY_KEY);
    if (expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= +expiryTime) {
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    this.checkSessionExpiry();
    this.authToken = this.getToken();
    return !!this.authToken;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    this.removeStorageItem(this.TOKEN_KEY);
    this.removeStorageItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    this.clearSessionStorage();
    this.isAuthenticated = false;
    this.authToken = null;
    this.router.navigate(['/login']);
  }

  private clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
