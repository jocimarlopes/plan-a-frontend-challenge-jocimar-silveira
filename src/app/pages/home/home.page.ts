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

  constructor(
    private storage: StorageService,
    private router: Router,

  ) {}
  
  async ngOnInit() {
  }

  async logout() {
    await this.storage.clear()
    this.router.navigate(['login'])
  }

}
