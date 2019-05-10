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
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(api, navCtrl, menuCtrl, loadingCtrl, formBuilder) {
        this.api = api;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.services = [];
        this.getAllService();
    }
    RegisterPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false);
    };
    RegisterPage.prototype.ngOnInit = function () {
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
    };
    RegisterPage.prototype.testlog = function () {
        console.log(this.onRegisterForm.controls['nom'].value, this.onRegisterForm.controls['prenom'].value, this.onRegisterForm.controls['email'].value, this.onRegisterForm.controls['password'].value, this.onRegisterForm.controls['serviceId'].value);
    };
    RegisterPage.prototype.signUp = function () {
        return __awaiter(this, void 0, void 0, function () {
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
                        if (this.onRegisterForm.valid) {
                            this.api.enregistrer(this.onRegisterForm.controls['nom'].value, this.onRegisterForm.controls['prenom'].value, this.onRegisterForm.controls['email'].value, this.onRegisterForm.controls['password'].value, this.onRegisterForm.controls['serviceId'].value).subscribe(function (data) {
                                console.log(data);
                                if (data["success"]) {
                                    _this.navCtrl.navigateRoot('/');
                                    loader.dismiss();
                                }
                                else {
                                    loader.dismiss();
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.getAllService = function () {
        var _this = this;
        this.api.getAllService().subscribe(function (data) {
            if (data["success"]) {
                _this.services = data["result"];
            }
        });
    };
    // // //
    RegisterPage.prototype.goToLogin = function () {
        var _this = this;
        if (this.onRegisterForm.valid) {
            this.api.enregistrer(this.onRegisterForm.controls['nom'].value, this.onRegisterForm.controls['prenom'].value, this.onRegisterForm.controls['email'].value, this.onRegisterForm.controls['password'].value, this.onRegisterForm.controls['serviceId'].value).subscribe(function (data) {
                if (data["success"]) {
                    console.log("ohhhhh yeah");
                    _this.navCtrl.navigateRoot('/');
                }
            });
        }
    };
    RegisterPage = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            NavController,
            MenuController,
            LoadingController,
            FormBuilder])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map