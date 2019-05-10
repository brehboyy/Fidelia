import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost/apiDelRepas/tests/';
  //--------Personne------
  getPersonne(personneId){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    var dayta = {
      personneId:personneId
    };
    return this.http.post(this.baseUrl+'personne.php/get', JSON.stringify(dayta), {headers});
  }

  getAllPersonne(){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    return this.http.get(this.baseUrl+'personne.php/getall', {headers});
  }
  //--------Fin Personne-------
  //--------Service------------
  getAllService(){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    return this.http.get(this.baseUrl+'service.php/getall', {headers});
  }
  //--------Fin Service -------
  //--------Visite-------
  getAllVisites(userid){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return 	this.http.get(this.baseUrl+'visite.php/getall/' + userid, {headers});
  }

  setVisite(criteres, userid, magasinid, ){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    var dayta = {
      criteres:criteres,
      userid:userid,
      magasinid:magasinid
    };
    return this.http.post(this.baseUrl+'visite.php/set', JSON.stringify(dayta), {headers});
  }
  //_______Fin Visite-----------

  //-----------Magasin ------------
  getAllMagasin(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return 	this.http.get(this.baseUrl+'magasin.php/getall', {headers});
  }
  //-----------Fin Magasin-----------

  //-------Connexion----------
  enregistrer(nom,prenom,email,password,serviceId){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    var dayta = {
      email:email,
      password:password,
      nom:nom.toUpperCase(),
      prenom: prenom.toUpperCase(),
      serviceId:serviceId
    };
    return this.http.post(this.baseUrl+'personne.php/signup',JSON.stringify(dayta),{headers});  
    }

  connexion(email, password){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    var dayta = {
      email:email,
      password:password
    };
    return this.http.post(this.baseUrl+'personne.php/login', JSON.stringify(dayta), {headers});
  }

  forgotPassword(email){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    var dayta = {
      email:email
    };
    return this.http.post(this.baseUrl+'personne.php/forgotpassword', JSON.stringify(dayta), {headers});
  }
  //-------FIN Connexion---------

  //-------Plat -----------
  getAllPlat(){
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'Accept': 'application/json' 
      }
    );
    return this.http.get(this.baseUrl+'plat.php/getall', {headers});
  }

  //-------Fin Plat------------

}
