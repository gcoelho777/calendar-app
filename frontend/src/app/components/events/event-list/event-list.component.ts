import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
    events: any = [];

    constructor(private authService: AuthService, private eventService: EventService, private router: Router) { }

    ngOnInit(): void { 
        this.loadEvents(); 
    } 
    
    loadEvents(): void { 

        if(this.authService.isAuthenticated()) {
            this.eventService.getEvents().subscribe(events => { 
                console.log(events);
                this.events = events; 
            }); 

            return;
        }
    } 

    // Função de exclusão
  deleteEvent(eventId: null | string): void {
    if (confirm('Tem certeza de que deseja excluir este evento?')) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        // Atualize a lista de eventos após a exclusão
        this.events = this.events.filter((event: { id: string | null; }) => event.id !== eventId);
        alert('Evento excluído com sucesso');
      }, (error) => {
        console.error('Erro ao excluir evento', error);
        alert('Erro ao excluir evento');
      });
    }
}

    calculateDuration(start_time: string, end_time: string): string {
        const startTime = new Date(start_time);
        const endTime = new Date(end_time);
        const durationInMs = endTime.getTime() - startTime.getTime();
        const durationInHours = durationInMs / (1000 * 60 * 60);
        const hours = Math.floor(durationInHours);
        const minutes = Math.round((durationInHours - hours) * 60);
        return `${hours}h ${minutes}min`;
    } 

}
