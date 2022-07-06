import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { HelpersService } from './helpers.service';
import { StatesService } from './states.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private states: StatesService,
    private helpers: HelpersService,
    private api: ApiService
    ) {}

    // Verify if token is valid or expired
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const now = new Date()
    const token = await this.states.get_token_data()
    const token_date = new Date(token['expires_at'])
    const expires = (token_date.getTime() / 1000) - (now.getTime() / 1000)
    if (!expires || isNaN(expires) || expires < 1) {
      this.helpers.message('session expired, please, login again', 2400, 'warning')
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}