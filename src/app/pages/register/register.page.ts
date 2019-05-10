import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  public services: any=[];
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    this.getAllService();
   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'nom': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*.[a-zA-Z]{2,4}')
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[?=.*0-9a-zA-Z]*'), 
        Validators.minLength(8)
      ])],
      'prenom': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(15), 
        Validators.pattern('[a-zA-Z0-9 ]*')
      ])],
      'serviceId': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  testlog(){
    console.log(this.onRegisterForm.controls['nom'].value,
    this.onRegisterForm.controls['prenom'].value,
    this.onRegisterForm.controls['email'].value,
    this.onRegisterForm.controls['password'].value,
    this.onRegisterForm.controls['serviceId'].value);
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    
    if(this.onRegisterForm.valid)
    {
      this.api.enregistrer(
        this.onRegisterForm.controls['nom'].value,
        this.onRegisterForm.controls['prenom'].value,
        this.onRegisterForm.controls['email'].value,
        this.onRegisterForm.controls['password'].value,
        this.onRegisterForm.controls['serviceId'].value
        ).subscribe(data =>{
          console.log(data);
          if (data["success"]){
            this.navCtrl.navigateRoot('/');
            loader.dismiss();
          }else{
            loader.dismiss();
          }
        });
    }
  }

  getAllService(){
    this.api.getAllService().subscribe(data => {
      if(data["success"]){
        this.services = data["result"];
      }
    })
  }

  // // //
   goToLogin() {
    if(this.onRegisterForm.valid)
    {
      this.api.enregistrer(
        this.onRegisterForm.controls['nom'].value,
        this.onRegisterForm.controls['prenom'].value,
        this.onRegisterForm.controls['email'].value,
        this.onRegisterForm.controls['password'].value,
        this.onRegisterForm.controls['serviceId'].value
        ).subscribe(data =>{
          if (data["success"]){
            console.log("ohhhhh yeah");
            this.navCtrl.navigateRoot('/');
          }
        });
      
    }
  }
}
