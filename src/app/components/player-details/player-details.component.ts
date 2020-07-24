import { Component, OnInit, TemplateRef } from '@angular/core';
import { Player } from 'src/app/entity/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/entity/team';
import { Rating } from 'src/app/entity/rating';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-player-details',
	templateUrl: './player-details.component.html',
	styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

	player: Player = new Player();
	team: Team = new Team();
	rating: Rating = new Rating();

	modalRef: BsModalRef;
	message: string;

	constructor(private playerService: PlayerService, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) { }

	ngOnInit() {
		this.getPlayerDetails();
		this.getPlayerTeam();
	}

	showTeam() {
		this.router.navigate(['/teams', this.team.id]);
	}

	getPlayerDetails() {
		const playerId: number = +this.route.snapshot.paramMap.get('id');
		this.playerService.getPlayerById(playerId).subscribe(this.getPlayerResult());
	}

	getPlayerTeam() {
		const playerId: number = +this.route.snapshot.paramMap.get('id');
		this.playerService.getTeamByPlayerId(playerId).subscribe(this.getTeamResult());
	}
	
	delete(){
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.playerService.deletePlayer(id).subscribe(
			() => {
				console.log('Player with was deleted')
			}
		);
		this.router.navigate(['/players']);
	}

	getTeamResult() {
		return (data) => {
			this.team = data;
		}
	}

	getPlayerResult() {
		return (data) => {
			this.player = data;
		}
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
	}

	confirm(): void {
		this.modalRef.hide();
		this.delete();
	}

	decline(): void {
		this.modalRef.hide();
	}


}
