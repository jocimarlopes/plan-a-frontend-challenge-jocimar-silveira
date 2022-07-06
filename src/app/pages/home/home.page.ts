import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  lastMovie: any = {}

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,

  ) {}
  
  async ngOnInit() {
    await this.getLastMovie()
  }

  async getLastMovie() {
    this.api.get('movie/latest').subscribe((res: any) => {
      this.lastMovie = res
      return
    })
  }

  async logout() {
    await this.storage.clear()
    this.router.navigate(['login'])
  }

}
