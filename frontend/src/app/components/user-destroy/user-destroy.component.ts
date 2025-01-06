import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-destroy',
  imports: [],
  templateUrl: './user-destroy.component.html',
  styleUrl: './user-destroy.component.css'
})
export class UserDestroyComponent {
    constructor(private authService: AuthService, private router: Router) {}
    deleteUser() {
        this.authService.deleteUser().subscribe(response => {
            console.log('Usuario excluido com sucesso', response);
            localStorage.removeItem('access_token');
            this.router.navigate(['/registrar']);
        }, error => {
            console.log('Erro ao excluir usuario', error);
        });
    }
}
