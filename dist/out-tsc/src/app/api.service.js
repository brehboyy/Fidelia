var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost/apiDelRepas/tests/';
    }
    //--------Personne------
    ApiService.prototype.getPersonne = function (personneId) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        var dayta = {
            personneId: personneId
        };
        return this.http.post(this.baseUrl + 'personne.php/get', JSON.stringify(dayta), { headers: headers });
    };
    ApiService.prototype.getAllPersonne = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        return this.http.get(this.baseUrl + 'personne.php/getall', { headers: headers });
    };
    //--------Fin Personne-------
    //--------Service------------
    ApiService.prototype.getAllService = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        return this.http.get(this.baseUrl + 'service.php/getall', { headers: headers });
    };
    //--------Fin Service -------
    //--------Visite-------
    ApiService.prototype.getAllVisites = function (userid) {
        var headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.get(this.baseUrl + 'visite.php/getall/' + userid, { headers: headers });
    };
    ApiService.prototype.setVisite = function (criteres, userid, magasinid) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        var dayta = {
            criteres: criteres,
            userid: userid,
            magasinid: magasinid
        };
        return this.http.post(this.baseUrl + 'visite.php/set', JSON.stringify(dayta), { headers: headers });
    };
    //_______Fin Visite-----------
    //-----------Magasin ------------
    ApiService.prototype.getAllMagasin = function () {
        var headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.get(this.baseUrl + 'magasin.php/getall', { headers: headers });
    };
    //-----------Fin Magasin-----------
    //-------Connexion----------
    ApiService.prototype.enregistrer = function (nom, prenom, email, password, serviceId) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        var dayta = {
            email: email,
            password: password,
            nom: nom.toUpperCase(),
            prenom: prenom.toUpperCase(),
            serviceId: serviceId
        };
        return this.http.post(this.baseUrl + 'personne.php/signup', JSON.stringify(dayta), { headers: headers });
    };
    ApiService.prototype.connexion = function (email, password) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        var dayta = {
            email: email,
            password: password
        };
        return this.http.post(this.baseUrl + 'personne.php/login', JSON.stringify(dayta), { headers: headers });
    };
    ApiService.prototype.forgotPassword = function (email) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        });
        var dayta = {
            email: email
        };
        return this.http.post(this.baseUrl + 'personne.php/forgotpassword', JSON.stringify(dayta), { headers: headers });
    };
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map