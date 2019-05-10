import { Component, OnInit, Pipe, PipeTransform, Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ModalController } from '@ionic/angular';
import { AddPlatPage } from '../../pages/modal/add-plat/add-plat.page';

@Component({
  selector: 'app-set-menu',
  templateUrl: './set-menu.page.html',
  styleUrls: ['./set-menu.page.scss'],
})
export class SetMenuPage implements OnInit {

  dayLabel:string[] = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];
  monthLabel:string[] = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Dec'];
  plats:any=[];
  typeplat:number = 0;
  constructor(public api: ApiService, public modalCtrl: ModalController) { 
    this.getAllPlat();
  }

  ngOnInit() {
  }

  getAllPlat(){
    this.api.getAllPlat().subscribe(
      data => {
        if(data["success"]){
          this.plats = data['result'];
        }
        console.log(data);
    });
  }

  async addRepas () {
    const modal = await this.modalCtrl.create({
      component: AddPlatPage
    });
    return await modal.present();
  }

  onChange(ev){
    console.log(this.typeplat);
  }
}

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {  
    if (!items) return [];        
    if(value == "0"){
      return items;
    }else{
      return items.filter(it => it[field] == value);
    }
  }
}