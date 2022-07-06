import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HelpersService } from 'src/app/services/helpers.service';
import { StatesService } from 'src/app/services/states.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false
  
  constructor(
    private api: ApiService,
    public formBuilder: FormBuilder,
    private helpers: HelpersService,
    private states: StatesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.validate()
  }

  validate() {
    this.loginForm= this.formBuilder.group({
        username: new FormControl("", [Validators.required/* , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') */]),
        password: new FormControl("",[Validators.required, Validators.minLength(6)]),
    });
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  async doLogin() {
    this.isSubmitted = true;
    if(this.loginForm.status === 'INVALID') {
      return this.helpers.message('invalid credentials, try again', 2400, 'warning')
    }
    const token_data = await this.api.getToken()
    const dados = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      request_token: token_data['request_token']
    }
    await this.helpers.loader()
    this.api.post('authentication/token/validate_with_login', dados).subscribe(async (res: any) => {
      await this.helpers.loading.dismiss()
      if(res['success']) {
        await this.states.setTokenData(res)
        await this.router.navigate(['home'])
        this.helpers.message('login successful', 2400, 'success')
        return
      }
      this.helpers.message('login error, try again', 2400, 'danger')
    },
    err => {
      this.helpers.loading.dismiss()
      this.helpers.message('login error, try again', 2400, 'danger')
    })
    
  }


}
