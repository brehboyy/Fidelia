import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';
import { AddPlatPageModule } from './pages/modal/add-plat/add-plat.module';
// Components
import { NotificationsComponent } from './components/notifications/notifications.component';
@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    IonicStorageModule.forRoot(),
    SearchFilterPageModule,
    AddPlatPageModule
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
