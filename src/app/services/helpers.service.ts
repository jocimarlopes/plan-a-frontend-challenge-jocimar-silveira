import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    public loading: LoadingController,
    public toast: ToastController,
    public alert: AlertController
  ) { }


  /**
   * Loader
   * To stop loader use:
   * this.helper.loading.dismiss();
   */
  async loader() {
    const loading = await this.loading.create({
      cssClass: 'loader',
      spinner: 'bubbles',
      message: 'please, wait..'
    });
    await loading.present();
  }

  /**
   *  Toast message
   *  message, time, color
   */
  async message(message, time, color) {
    const toast = await this.toast.create({
      message: message,
      duration: time,
      color: color
    });
    toast.present();
  }

  /**
   * Alert message pattern
   */
  async alertMessage(title, subtitle, message) {
    const alert = await this.alert.create({
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
