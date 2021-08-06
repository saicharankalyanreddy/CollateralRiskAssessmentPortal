import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppComponent } from './app.component';
import { PortalhomeComponent } from './portalhome/portalhome.component';
import { LoginComponent } from './login/login.component';
import { ColsubmissionComponent } from './colsubmission/colsubmission.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import {RiskassessmentComponent} from './RiskAssessment/riskassessment.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    PortalhomeComponent,
    LoginComponent,
    ColsubmissionComponent,
    NavbarComponent,
    RiskassessmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot({position:['bottom','left']}),
    BrowserAnimationsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
