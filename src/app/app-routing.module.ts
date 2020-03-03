import { GroupTicketComponent } from './group-ticket/group-ticket.component';
import { PersonalAccidentComponent } from './personal-accident/personal-accident.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TravelerInfoComponent } from './traveler-info/traveler-info.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PersonalResultComponent } from './personal-result/personal-result.component';
import { GroupResComponent } from './group-res/group-res.component';
import { ThanksComponent } from './thanks/thanks.component';
import { CarInsuranceComponent } from './car-insurance/car-insurance.component';
import { InsuranceInfoComponent } from './car-insurance/insurance-info/insurance-info.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'traveler-info', component: TravelerInfoComponent},
  {path: 'page/terms-of-service', component: TermsOfServicesComponent},
  {path: 'personal-accident', component: PersonalAccidentComponent},
  {path: 'personal-result', component: PersonalResultComponent},
  {path: 'group-travel', component: GroupResComponent},
  {path: 'group-res', component: GroupTicketComponent},
  {path: 'thanks', component: ThanksComponent},
  {path: 'car-insurance', component: CarInsuranceComponent},
  {path: 'insurance-info/:brandCar/:brand/:product/:price', component: InsuranceInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
