import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  imports: [FormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {
    event = {description: '', start_time: '', end_time: ''};

    constructor (private eventService: EventService, private router: Router) {}

    createEvent()
    {
        this.eventService.createEvent(this.event).subscribe(response => {
            console.log('Evento criado com sucesso', response);
            this.router.navigate(['/evento/lista-eventos'])
        }, error => {
            if(error.status === 409) {
                alert('Este evento se sobrepõe a um evento existente.');
            } else {
                console.error('Erro criando evento', error);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/evento/lista-eventos']);
    }

}
