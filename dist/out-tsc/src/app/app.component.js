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
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ApiService } from './api.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(api, storage, platform, splashScreen, statusBar, navCtrl) {
        this.api = api;
        this.storage = storage;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.user = null;
        this.userid = -1;
        this.dayLabel = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];
        this.monthLabel = ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Dec'];
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
            },
            {
                title: 'Gestion des plats',
                url: '/settings',
                direct: 'forward',
                icon: 'restaurant',
                visible: true
            },
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
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.ready().then(function () {
                _this.storage.get('USERID').then(function (val) {
                    _this.userid = val;
                    if (val > 0)
                        _this.navCtrl.navigateRoot('home-results');
                }).then(function () {
                    _this.getProfile();
                });
            });
        }).catch(function () { });
    };
    AppComponent.prototype.getProfile = function () {
        var _this = this;
        if (this.userid <= 0) {
            this.navCtrl.navigateRoot('/');
            return;
        }
        this.api.getPersonne(this.userid).subscribe(function (data) {
            console.log(data);
            if (data['success']) {
                _this.user = data['result'];
                _this.storage.set('user', _this.user);
            }
            else {
                _this.storage.ready().then(function () {
                    _this.storage.get('user').then(function (val) {
                        _this.user = val;
                    });
                });
            }
        });
    };
    AppComponent.prototype.goToEditProgile = function () {
        this.navCtrl.navigateForward('edit-profile');
    };
    AppComponent.prototype.logout = function () {
        this.storage.set("USERID", -1);
        this.navCtrl.navigateRoot('/');
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            Storage,
            Platform,
            SplashScreen,
            StatusBar,
            NavController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map