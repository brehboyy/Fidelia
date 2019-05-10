var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage';
var VisitePage = /** @class */ (function () {
    function VisitePage(route, api, storage) {
        var _this = this;
        this.route = route;
        this.api = api;
        this.storage = storage;
        this.criteres = [];
        this.set = false;
        this.criteres = [{ "index": 0, "text": "Placement des produits", "note": 0, "checked": false }, { "index": 1, "text": "Etiquette conforme", "note": 0, "checked": false }, { "index": 2, "text": "Prix", "note": 0, "checked": false }, { "index": 3, "text": "Hauteur", "note": 0, "checked": false }];
        try {
            this.route.queryParams.subscribe(function (params) {
                _this.visite = JSON.parse(params["visite"] || '1');
                if (_this.visite == JSON.parse('1')) {
                    _this.set = true;
                    _this.getMagasin();
                    console.log(_this.magasins);
                }
                else
                    _this.set = false;
            });
        }
        catch (error) {
        }
    }
    VisitePage.prototype.getMagasin = function () {
        var _this = this;
        this.api.getAllMagasin().subscribe(function (data) {
            console.log(data);
            if (data['success']) {
                _this.magasins = data['result'];
                _this.storage.set('magasins', _this.magasins);
            }
            else {
                _this.storage.ready().then(function () {
                    _this.storage.get('magasins').then(function (val) {
                        _this.magasins = val;
                    });
                });
            }
        });
    };
    VisitePage.prototype.setVisite = function () {
        console.log(this.magasin);
        //this.api.setVisite(this.criteres, thi)
    };
    VisitePage.prototype.ngOnInit = function () {
    };
    VisitePage.prototype.addCritere = function () {
        this.criteres.push({ "index": 0, "text": "", "note": 0, "checked": false });
    };
    VisitePage.prototype.deleteCritere = function (critere) {
        this.criteres.splice(this.criteres.indexOf(critere), 1);
    };
    VisitePage = __decorate([
        Component({
            selector: 'app-visite',
            templateUrl: './visite.page.html',
            styleUrls: ['./visite.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ApiService, Storage])
    ], VisitePage);
    return VisitePage;
}());
export { VisitePage };
//# sourceMappingURL=visite.page.js.map