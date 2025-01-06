import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register',
	imports: [FormsModule, RouterModule, CommonModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent{
  	name: any = '';
	email: any = '';
	password: any = '';
    password_confirmation: any = '';
    errorMessage: string = '';
    

	constructor(private authService: AuthService, private router: Router) {}

    
	register()
	{
		const userData = { name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation };

		this.authService.register(userData).subscribe(response => {
            localStorage.setItem('access_token', response.token);
            this.router.navigate(['evento/lista-eventos']);
		}, error => {
            this.errorMessage = error.error.message || 'Erro ao registrar usuário';
		})
	}

}
