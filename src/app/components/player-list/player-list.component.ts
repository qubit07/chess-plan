import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/entity/player';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players: Player[] = [];

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private playerService: PlayerService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.listPlayers();
  }

  listPlayers() {
    this.playerService.getPlayerList().subscribe(this.getResult());
  }

   getResult() {
    return (data) => {
      this.players = data._embedded.players;
    }
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listPlayers();
  }

  deletePlayer() {
    console.log("delete player: ");
  }
}
