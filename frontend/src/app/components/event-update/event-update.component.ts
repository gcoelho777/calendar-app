import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-update',
  imports: [FormsModule],
  templateUrl: './event-update.component.html',
  styleUrl: './event-update.component.css'
})
export class EventUpdateComponent implements OnInit {
    event = {description: '', start_time: '', end_time: ''};

    constructor(private authService: AuthService, private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

    ngOnInit(): void {
        if(this.authService.isAuthenticated()) {
            const id = this.route.snapshot.paramMap.get('id');
            this.eventService.getEvent(id).subscribe(response => {
                this.event = response;
            })

            return;
        }
        this.router.navigate(['/registrar']);
    }

    updateEvent() {
        if(this.authService.isAuthenticated()) {
            const id = this.route.snapshot.paramMap.get('id');
            this.eventService.updateEvent(id, this.event).subscribe(response => {
                console.log('Evento atualizado com sucesso!', response);
                this.router.navigate(['evento/lista-eventos']);
            }, error => {
                if(error.status === 409) {
                    alert('Este evento se sobrepõe a um evento existente.');
                } else if (error.status === 422) {
                    alert('O dia do evento não pode ser posterior ao dia do termino.');
                } else {
                    console.error('Erro ao atualizar evento', error);
                }
            });

            return;
        }

        this.router.navigate(['/registrar']);
    }

    goBack(): void {
        this.router.navigate(['/evento/lista-eventos']);
    }


}
