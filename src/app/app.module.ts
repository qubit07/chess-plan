import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { RoundListComponent } from './components/round-list/round-list.component';
import { GamescorePipe } from './pipes/gamescore.pipe';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'tournaments', component: TournamentListComponent },
	{ path: 'tournaments/add', component: TournamentFormComponent },
	{ path: 'tournaments/:id', component: TournamentDetailsComponent },
	{ path: 'tournaments/:id/edit', component: TournamentFormComponent },
	{ path: 'tournaments/:id/players', component: PlayerListComponent },
	{ path: 'tournaments/:id/rounds', component: RoundListComponent },
	{ path: 'tournaments/:id/rounds/:id2/games', component: GameListComponent },
	{ path: 'rounds/:id/tournament', component: TournamentDetailsComponent },
	{ path: 'games/:id', component: GameDetailsComponent },
	{ path: 'players', component: PlayerListComponent },
	{ path: 'players/:id', component: PlayerDetailsComponent },
	{ path: 'players/search/:keyword', component: PlayerListComponent },
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
		TournamentFormComponent,
		RoundListComponent,
		GamescorePipe,
		GameListComponent,
		GameDetailsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		ModalModule.forRoot()
	],
	providers: [BsModalService],
	bootstrap: [AppComponent]
})
export class AppModule { }
