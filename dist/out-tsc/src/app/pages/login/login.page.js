var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage';
var LoginPage = /** @class */ (function () {
    function LoginPage(storage, api, navCtrl, menuCtrl, toastCtrl, alertCtrl, loadingCtrl, formBuilder) {
        this.storage = storage;
        this.api = api;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.personnes = [];
        this.personnesSave = [];
        this.getAllPersonne();
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.ngOnInit = function () {
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
    };
    LoginPage.prototype.forgotPass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
                                    handler: function () {
                                        alert.dismiss();
                                    }
                                }, {
                                    text: 'Confirmer',
                                    handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                        var loader;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.loadingCtrl.create({
                                                        duration: 2000
                                                    })];
                                                case 1:
                                                    loader = _a.sent();
                                                    loader.present();
                                                    this.api.forgotPassword(data.email).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                        var toast, toast;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!data["success"]) return [3 /*break*/, 2];
                                                                    loader.dismiss();
                                                                    return [4 /*yield*/, this.toastCtrl.create({
                                                                            showCloseButton: true,
                                                                            message: data["message"],
                                                                            duration: 3000,
                                                                            position: 'bottom'
                                                                        })];
                                                                case 1:
                                                                    toast = _a.sent();
                                                                    toast.present();
                                                                    return [3 /*break*/, 4];
                                                                case 2: return [4 /*yield*/, this.toastCtrl.create({
                                                                        showCloseButton: true,
                                                                        message: data["message"],
                                                                        duration: 3000,
                                                                        position: 'bottom'
                                                                    })];
                                                                case 3:
                                                                    toast = _a.sent();
                                                                    loader.dismiss();
                                                                    toast.present();
                                                                    _a.label = 4;
                                                                case 4: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // // //
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.navigateRoot('/register');
    };
    LoginPage.prototype.goToHome = function () {
        var _this = this;
        if (this.onLoginForm.valid) {
            this.api.connexion(this.onLoginForm.controls['email'].value.toString(), this.onLoginForm.controls['password'].value.toString()).subscribe(function (data) {
                if (data["success"]) {
                    _this.navCtrl.navigateRoot('/home-results');
                }
                else {
                    console.log("pb");
                }
            });
        }
    };
    LoginPage.prototype.getAllPersonne = function () {
        var _this = this;
        this.api.getAllPersonne().subscribe(function (data) {
            console.log(data);
            if (data["success"]) {
                _this.personnes = data["result"];
                _this.personnesSave = _this.personnes;
            }
        });
    };
    LoginPage.prototype.initializeItems = function () {
        this.personnes = this.personnesSave;
    };
    LoginPage.prototype.setNom = function (nom, prenom) {
        this.onLoginForm.controls['nomComplet'].setValue(nom + " " + prenom);
    };
    LoginPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        this.personnes = this.personnes.filter(function (item) {
            return ((item.PER_PRENOM + " " + item.PER_NOM).toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        if (this.personnes.length == 1) {
            this.setNom(this.personnes[0].PER_NOM, this.personnes[0].PER_PRENOM);
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [Storage,
            ApiService,
            NavController,
            MenuController,
            ToastController,
            AlertController,
            LoadingController,
            FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map