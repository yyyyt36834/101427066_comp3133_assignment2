import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log('Register method called');  // Debugging log
    this.authService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
