import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    confirmDelete(id: string | null): void {
        if(confirm('Tem certeza que deseja excluir este evento?')) {
            this.deleteEvent(id);
        }
    }
    
    deleteEvent(id: string | null): void { 
        if(this.authService.isAuthenticated()) {
            this.eventService.deleteEvent(id).subscribe(() => { 
                console.log('Evento excluido com sucesso'); 
                this.loadEvents();
                }, error => { console.error('Erro ao excluir evento', error); 
            }); 
        }
        this.router.navigate(['/registrar']);
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

    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            this.router.navigate(['/registrar']);
        }
    }
}
