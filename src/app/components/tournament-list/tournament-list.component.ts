import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/entity/tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
    this.tournamentService.getTournamentList().subscribe(this.getResult());
  }

  getResult() {
    return (data) => {
      this.tournaments = data._embedded.tournaments;
    }
  }
}
