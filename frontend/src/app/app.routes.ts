import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserShowComponent } from './components/user-show/user-show.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDestroyComponent } from './components/user-destroy/user-destroy.component';
import { EventCreateComponent } from './components/events/event-create/event-create.component';
import { EventUpdateComponent } from './components/events/event-update/event-update.component';
import { authGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/auth.no-guard';
import { EventListComponent } from './components/events/event-list/event-list.component';


export const routes: Routes = [
    {   path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
    {   path: 'registrar', component: RegisterComponent, canActivate: [NoAuthGuard] },
    {   path: 'usuario/perfil', component: UserShowComponent},
    {   path: 'usuario/atualizar-dados', component: UserUpdateComponent},
    {   path: 'usuario/excluir-conta', component: UserDestroyComponent},
    {   path: 'evento/lista-eventos', component: EventListComponent, canActivate: [authGuard]},
    {   path: 'evento/criar-evento', component: EventCreateComponent, canActivate: [authGuard]},
    {   path: 'evento/atualizar-evento/:id', component: EventUpdateComponent, canActivate: [authGuard]},
    {   path: '', redirectTo: '/login', pathMatch: 'full'}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
