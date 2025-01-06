import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  imports: [FormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
    user: any = {};

    constructor(private authService: AuthService) {
        this.authService.getUser().subscribe(response => {
            this.user = response.usuario;
        });
    }

    updateUser() 
    {
        this.authService.updateUser(this.user).subscribe(response => {
            console.log('Usuario atualizado com sucesso', response)
        }, error => {
            console.error('Erro atualizando usuario', error);
        });
    }
}
