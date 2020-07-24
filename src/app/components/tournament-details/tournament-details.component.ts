import { Component, OnInit, TemplateRef } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/entity/tournament';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-tournament-details',
	templateUrl: './tournament-details.component.html',
	styleUrls: ['./tournament-details.component.css']
})
export class TournamentDetailsComponent implements OnInit {

	tournament: Tournament = new Tournament();

	modalRef: BsModalRef;
	message: string;

	tournamentForm = new FormGroup({
		name: new FormControl('')
	});

	constructor(private modalService: BsModalService, private tournamentService: TournamentService, private route: ActivatedRoute, private router: Router, ) { }

	ngOnInit() {
		this.getTournamentDetails();
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

	delete() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.tournamentService.deleteTournament(id).subscribe(
			() => {
				console.log('Tournament with was deleted')
			}
		);
		this.router.navigate(['/tournaments']);
	}


	getTournamentDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');

		this.tournamentService.getTournamentById(id).subscribe(
			(data) => {
				this.tournament = data;
			}
		);
	}
}
