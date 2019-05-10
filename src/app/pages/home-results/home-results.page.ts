import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';
// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  userid:number=-1;
  yourLocation:string ="";
  visites:any=[];
  user:any;
  dayLabel:string[] = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];
  monthLabel:string[] = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Dec'];
  constructor(
    public api: ApiService,
    public storage:Storage,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
    storage.ready().then(() => {
      storage.get('USERID').then((val) => {
        this.userid = val;
      }).then(() => {
        this.getProfile();
      });
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  getProfile(){
    /*if(this.userid <= 0){
      this.navCtrl.navigateRoot('/');
      return;
    } 
    this.api.getPersonne(this.userid).subscribe(data => {
      console.log(data);
      if(data['success']){
        this.getVisites();
        this.storage.set('user', this.visites);
      }else{
        this.storage.ready().then(() => {
          this.storage.get('user').then((val) => {
            this.user = val;
          }).then(() => {
            this.getProfile();
          });
        });
      }
    })*/
  }

  getVisites(){
    this.api.getAllVisites(this.userid).subscribe(data => {
      console.log(data);
      if(data["success"]){
        this.visites = data["result"];
        this.storage.set('visites', this.visites);
      }else{
        this.storage.get('visites').then((val) => {
          this.visites = val;
        });
      }
    });
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  //#region  Redirection
  goToVisite(visite){
    console.log("go to viste");
    let navParamExtra : NavigationExtras = {
      queryParams: {
        visite: JSON.stringify(visite)
      }
    };
    this.navCtrl.navigateForward(['visite'], navParamExtra);
  }
  //#endregion

}
