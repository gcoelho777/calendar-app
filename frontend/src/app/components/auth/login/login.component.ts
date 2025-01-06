import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email: any = '';
    password: any = '';
    errorMessage: string = '';
    
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}


    login()
    {
        const credentials = { email: this.email, password: this.password }
        this.authService.login(credentials).subscribe(response => {
            localStorage.setItem('access_token', response.token);
            this.router.navigate(['evento/lista-eventos']);
        }, error => {
            this.errorMessage = error.error.message || 'Erro ao fazer login';
        });
    }
}
