import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-show',
  imports: [],
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent implements OnInit {
    user: any;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUser().subscribe(response => {
            this.user = response.usuario;
        });
    }
}
