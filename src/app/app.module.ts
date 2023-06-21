// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxStripeModule } from 'ngx-stripe';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';


import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { LeftsidemenuComponent } from './leftsidemenu/leftsidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { AppInterceptorService } from './_service/app-interceptor.service';
import { CustomcomponentsModule } from './customcomponents/customcomponents.module';
import { RightsideComponent } from './rightside/rightside.component';
import { ToastrModule } from 'ngx-toastr';
// import { DynamicTempModule } from './dynamic-temp/dynamic-temp.module';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { EtsyCallbackComponent } from './etsy-callback/etsy-callback.component';
import { VerifyComponent } from './verify/verify.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

const dbConfig: DBConfig  = {
  name: 'shub',
  version: 1,
  objectStoresMeta: [{
    store: 'shub',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'key', keypath: 'key', options: { unique: false } },
      { name: 'value', keypath: 'value', options: { unique: false } } 
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    AdminComponent,
    HeaderComponent,
    LeftsidemenuComponent,
    FooterComponent,
    RightsideComponent,
    EtsyCallbackComponent,
    VerifyComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule, 
    NgxIndexedDBModule.forRoot(dbConfig),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    CustomcomponentsModule,  
    CommonModule,
    // DynamicTempModule,
    ToastrModule.forRoot({
      progressAnimation:"decreasing",
      progressBar:true,
      timeOut: 4000,
      closeButton:true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
   
    RouterModule.forRoot(Approutes, { useHash: false }),
  ],
 
  providers: [    
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
