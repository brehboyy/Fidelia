import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { Pages } from './interfaces/pages';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  user:any=null;
  userid:number=-1;
  dayLabel:string[] = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];
  monthLabel:string[] = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Dec'];
  constructor(
    private api: ApiService,
    public storage:Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.appPages = [
      {
        title: 'Accueil',
        url: '/home-results',
        direct: 'root',
        icon: 'home',
        visible: true
      },
      {
        title: 'A propos',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline',
        visible: true
      },

      {
        title: 'Options',
        url: '/settings',
        direct: 'forward',
        icon: 'cog',
        visible: true
      }
      ,
      {
        title: 'Gestion des plats',
        url: '/settings',
        direct: 'forward',
        icon: 'restaurant',
        visible: true
      }
      ,
      {
        title: 'Gestion des menus',
        url: '/set-menu',
        direct: 'forward',
        icon: 'bookmarks',
        visible: true
      },
      {
        title: 'Gestion des commandes',
        url: '/settings',
        direct: 'forward',
        icon: 'calculator',
        visible: true
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.ready().then(() => {
        this.storage.get('USERID').then((val) => {
          this.userid = val;
           if(val > 0)this.navCtrl.navigateRoot('home-results');
        }).then(() => {
          this.getProfile();
        }) ;
      });
    }).catch(() => {});
  }

  getProfile(){
    if(this.userid <= 0){
      this.navCtrl.navigateRoot('/');
      return;
    } 
    this.api.getPersonne(this.userid).subscribe(data => {
      console.log(data);
      if(data['success']){
        this.user = data['result'];
        this.storage.set('user', this.user );
      }else{
        this.storage.ready().then(() => {
          this.storage.get('user').then((val) => {
            this.user = val;
          })
        });
      }
    });
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.storage.set("USERID", -1);
    this.navCtrl.navigateRoot('/');
  }
}
