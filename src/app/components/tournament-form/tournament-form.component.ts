import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/entity/tournament';
import { Round } from 'src/app/entity/round';
import { Address } from 'src/app/entity/address';

@Component({
	selector: 'app-tournament-form',
	templateUrl: './tournament-form.component.html',
	styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {

	tournament: Tournament = new Tournament();

	systems = ['SWISS', 'ROUND', 'KO']
	types = ['CLASSIC', 'RAPID', 'BLITZ']

	tournamentFormGroup = new FormGroup({
		id: new FormControl(),
		name: new FormControl(),
		type: new FormControl(),
		system: new FormControl(),
		players: new FormControl(),
		rounds: new FormControl(),
		numberOfPlayers: new FormControl(),
		numberOfRounds: new FormControl(),
		startDate: new FormControl(),
		endDate: new FormControl(),

		address: new FormGroup({
			country: new FormControl(),
			city: new FormControl(),
			street: new FormControl()
		})
	});


	constructor(private tournamentService: TournamentService, private router: Router, private route: ActivatedRoute) {
		this.tournament.address = new Address();
		this.tournament.rounds = [];
		this.tournament.numberOfPlayers = 0;

		this.tournament.system = this.systems[0];
		this.tournament.type = this.types[0];

		this.tournamentFormGroup.get('type').setValue(this.tournament.type);
		this.tournamentFormGroup.get('system').setValue(this.tournament.system);
	}

	ngOnInit() {
		this.getTournamentDetails();
	}

	initFormValues() {
		this.tournamentFormGroup.get('id').setValue(this.tournament.id);
		this.tournamentFormGroup.get('name').setValue(this.tournament.name);
		this.tournamentFormGroup.get('type').setValue(this.tournament.type);
		this.tournamentFormGroup.get('system').setValue(this.tournament.system);
		this.tournamentFormGroup.get('rounds').setValue(this.tournament.rounds);
		this.tournamentFormGroup.get('players').setValue(this.tournament.players);

		this.tournamentFormGroup.get('startDate').setValue(this.tournament.startDate);
		this.tournamentFormGroup.get('endDate').setValue(this.tournament.endDate);
		this.tournamentFormGroup.get('numberOfPlayers').setValue(this.tournament.numberOfPlayers);
		this.tournamentFormGroup.get('numberOfRounds').setValue(this.tournament.rounds.length);

		this.tournamentFormGroup.get('address.country').setValue(this.tournament.address.country);
		this.tournamentFormGroup.get('address.city').setValue(this.tournament.address.city);
		this.tournamentFormGroup.get('address.street').setValue(this.tournament.address.street)
	}

	onSubmit() {
		this.tournamentService.createTournament(this.tournamentFormGroup.value).subscribe(
			(data) => {
				this.tournament = data;
				this.router.navigate(['/tournaments', this.tournament.id]);
			}
		);
	}

	getTournamentDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		if (id > 0) {
			this.tournamentService.getTournamentById(id).subscribe(
				(data) => {
					this.tournament = data;
					this.tournament.rounds.sort((a, b) => a.number - b.number)
					this.initFormValues();
				}
			);
		}
	}
}
