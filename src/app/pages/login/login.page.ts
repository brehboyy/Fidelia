import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Navigation } from 'selenium-webdriver';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  public personnes:any=[];
  public personnesSave:any=[];

  constructor(
    public storage: Storage,
    private api: ApiService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) 
  {
    this.getAllPersonne();
   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*.[a-zA-Z]{2,4}')
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[?=.*0-9a-zA-Z]*'), 
        Validators.minLength(8)
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Mot de passe oublié?',
      message: 'Entrer votre adresse mail',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Confirmer',
          handler: async data => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();

            this.api.forgotPassword(
              data.email
              ).subscribe(async data =>{
                if (data["success"]){
                  loader.dismiss();
                  const toast = await this.toastCtrl.create({
                    showCloseButton: true,
                    message:data["message"],
                    duration: 3000,
                    position: 'bottom'
                  });
    
                  toast.present();
                }else{
                  const toast = await this.toastCtrl.create({
                    showCloseButton: true,
                    message: data["message"],
                    duration: 3000,
                    position: 'bottom'
                  });
                  loader.dismiss();
    
                  toast.present();
                }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    if(this.onLoginForm.valid){
      this.api.connexion(this.onLoginForm.controls['email'].value.toString() ,this.onLoginForm.controls['password'].value.toString()).subscribe(data => {
        if(data["success"]){
          this.navCtrl.navigateRoot('/home-results');
        }else{
          console.log(data["message"]);
        }
      });
    }
  }

  getAllPersonne(){
    this.api.getAllPersonne().subscribe(data => {
      
      console.log(data);
      if(data["success"]){
        this.personnes = data["result"];
        this.personnesSave = this.personnes;
      }
    });
  }
  initializeItems(){
  	this.personnes = this.personnesSave;
  }

  setNom(nom, prenom){
    this.onLoginForm.controls['nomComplet'].setValue(nom + " " + prenom);
  }

  getItems(ev: any) {
     // Reset items back to all of the items
	this.initializeItems();

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
    this.personnes = this.personnes.filter((item) => {
      return ((item.PER_PRENOM + " " + item.PER_NOM).toLowerCase().indexOf(val.toLowerCase()) > -1);
    });

    if(this.personnes.length == 1){
      this.setNom(this.personnes[0].PER_NOM, this.personnes[0].PER_PRENOM);
    }
	}
}
