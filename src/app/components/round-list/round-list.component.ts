import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/entity/tournament';
import { ActivatedRoute } from '@angular/router';
import { Round } from 'src/app/entity/round';


@Component({
	selector: 'app-round-list',
	templateUrl: './round-list.component.html',
	styleUrls: ['./round-list.component.css']
})
export class RoundListComponent implements OnInit {

	tournament: Tournament = new Tournament();
	rounds: Round [] = [];
	
	constructor(private tournamentService: TournamentService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getTournamentDetails();
		this.getRounds();
	}

	getTournamentDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.tournamentService.getTournamentById(id).subscribe(
			(data) => {
				this.tournament = data;
			}
		);
	}
	
	getRounds(){
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.tournamentService.getRoundById(id).subscribe(this.getRoundResult());
	}
	
	getRoundResult() {
    	return (data) => {
      		this.rounds = data._embedded.rounds;
    	}
  	}

}
