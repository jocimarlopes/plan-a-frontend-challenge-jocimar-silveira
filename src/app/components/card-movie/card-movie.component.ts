import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
})
export class CardMovieComponent implements OnInit {

  lastMovie: any = {}

  constructor(
    private api: ApiService
  ) { }

  async ngOnInit() {
    await this.getLastMovie()
  }

  async getLastMovie() {
    this.api.get('movie/latest').subscribe((res: any) => {
      this.lastMovie = res
      return
    })
  }
}
