import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  imports: [FormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent implements OnInit {
    event = {description: '', start_time: '', end_time: ''};

    constructor (private eventService: EventService, private router: Router) {}

  
    ngOnInit() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
      const day = String(now.getDate() + 1).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
  
      // Formata para o padrão "YYYY-MM-DDTHH:MM"
      const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  
      // Define os valores iniciais para os campos
      this.event.start_time = currentDateTime   ;
      this.event.end_time = currentDateTime;
    }
  

    createEvent()
    {
        this.eventService.createEvent(this.event).subscribe(response => {
            console.log('Evento criado com sucesso', response);
            this.router.navigate(['/evento/lista-eventos'])
        }, error => {
            if(error.status === 409) {
                alert('Este evento se sobrepõe a um evento existente.');
            }
            if(error.status === 422) {
                const startTimeErrors = error.error?.errors?.start_time;
                if(startTimeErrors && startTimeErrors.length > 0) {
                    alert(startTimeErrors[0]);
                } 
            } else {
                console.error('Erro criando evento', error);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/evento/lista-eventos']);
    }

}
