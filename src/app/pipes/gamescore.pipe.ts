import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamescore'
})
export class GamescorePipe implements PipeTransform {

  transform(value: number): string {
	if(value == 0.5){
		return '0.5 - 0.5';
	}
	if(value == -1.0){
		return '0 - 1';
	}
	if(value == 1){
		return '1 - 0';
	}
    return " - ";
  }

}
