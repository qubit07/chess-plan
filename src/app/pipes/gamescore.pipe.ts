import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamescore'
})
export class GamescorePipe implements PipeTransform {

  transform(value: string): string {
	if(value == '1-0'){
		return '1 - 0';
	}
	if(value == '0-1'){
		return '0 - 1';
	}
	if(value == '0.5-0.5'){
		return '0.5 - 0.5';
	}
    return "0 - 0";
  }

}
