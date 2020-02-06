import { PersonalAccidentComponent } from './personal-accident/personal-accident.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TravelerInfoComponent } from './traveler-info/traveler-info.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PersonalResultComponent } from './personal-result/personal-result.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'traveler-info', component: TravelerInfoComponent},
  {path: 'page/terms-of-service', component: TermsOfServicesComponent},
  {path: 'personal-accident', component: PersonalAccidentComponent},
  {path: 'personal-result', component: PersonalResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
