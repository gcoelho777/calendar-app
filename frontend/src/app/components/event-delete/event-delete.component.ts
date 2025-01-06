import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-delete',
  imports: [],
  templateUrl:'./event-delete.component.html',
  styleUrl: './event-delete.component.css'
})
export class EventDeleteComponent implements OnInit {
    event: any;

    constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.eventService.getEvent(id).subscribe(response => {
            this.event = response;
        });
    }

    deleteEvent()
    {
        const id = this.route.snapshot.paramMap.get('id');
        this.eventService.deleteEvent(id).subscribe(response => {
            console.log('Evento excluido com sucesso', response);
            this.router.navigate(['/evento/lista-tarefas']);
        }, error => {
            console.error('Erro ao excluir evento', error);
        }) 
    }
}
