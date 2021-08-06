import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColsubmissionComponent } from './colsubmission/colsubmission.component';
import { LoginComponent } from './login/login.component';
import { PortalhomeComponent } from './portalhome/portalhome.component';
import { RiskassessmentComponent } from './RiskAssessment/riskassessment.component';
import { AuthGuadService } from './Services/auth-guad.service';
import { LoginGuardService } from './Services/LoginGuard/login-guard.service';

const routes: Routes = [
  {path: "", component: LoginComponent,canActivate:[LoginGuardService]},
 {path: "Home", component: PortalhomeComponent,canActivate:[AuthGuadService]},
 {path: "submitcollateral", component: ColsubmissionComponent,canActivate:[AuthGuadService]},
 {path:"Risk",component:RiskassessmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
