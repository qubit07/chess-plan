import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/entity/tournament';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {

  tournament: Tournament = new Tournament();

  systems = ['Round', 'Swiss', 'K.O.']

  tournamentForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private tournamentService: TournamentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTournamentDetails();
  }

  onSubmit() {
    this.tournamentService.createTournament(this.tournamentForm.value).subscribe();
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
