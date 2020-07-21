import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'tournaments/:id', component: TournamentDetailsComponent },
  { path: 'tournaments/:id/edit', component: TournamentFormComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/:id', component: PlayerDetailsComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/:id', component: TeamDetailsComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    TournamentListComponent,
    SearchComponent,
    PlayerListComponent,
    PlayerDetailsComponent,
    DashboardComponent,
    TournamentDetailsComponent,
    TeamListComponent,
    TeamDetailsComponent,
    TournamentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
