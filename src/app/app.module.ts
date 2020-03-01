import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgeTravelerComponent } from './welcome/get-quote/ageTraveler.component';
import { GroupAgeComponent } from './welcome/get-quote/groupAge.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TravelerInfoComponent } from './traveler-info/traveler-info.component';
import { QuoteComponent } from './traveler-info/quote/quote.component';
import { InfoComponent } from './traveler-info/info/info.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { GetQuoteComponent } from './welcome/get-quote/get-quote.component';
import { HttpClientModule } from '@angular/common/http';

// services
import { WelcomeService } from './welcome/welcome.service';
import { TravelerService } from './traveler-info/traveler.service';
import { SiteSettingsService } from './shared/site_settings.service';
import { UIService } from './shared/ui.services';
import { OdooService } from './shared/odoo.service';
import { ValidationService } from './shared/validation.service';
// components
import { TripDetailsComponent } from './traveler-info/trip-details/trip-details.component';
import { PriceCardComponent } from './traveler-info/price-card/price-card.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PaymentComponent } from './traveler-info/payment/payment.component';
import { ThankyouComponent } from './traveler-info/thankyou/thankyou.component';
import { ExcessComponent } from './traveler-info/excess/excess.component';
import { ListNavComponent } from './navigation/list-nav/list-nav.component';
import { PriceCardPaymentComponent } from './traveler-info/price-card-payment/price-card-payment.component';
import { from } from 'rxjs';
import { PersonalAccidentComponent } from './personal-accident/personal-accident.component';
import { PersonalResultComponent } from './personal-result/personal-result.component';
import { PersonalQuoteComponent } from './personal-quote/personal-quote.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { GroupResComponent } from './group-res/group-res.component';
import { GroupTicketComponent } from './group-ticket/group-ticket.component';
import { ThanksComponent } from './thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    AgeTravelerComponent,
    GroupAgeComponent,
    WelcomeComponent,
    TravelerInfoComponent,
    QuoteComponent,
    InfoComponent,
    HeaderComponent,
    NavbarComponent,
    GetQuoteComponent,
    TripDetailsComponent,
    PriceCardComponent,
    TermsOfServicesComponent,
    PaymentComponent,
    ThankyouComponent,
    ExcessComponent,
    ListNavComponent,
    PriceCardPaymentComponent,
    PersonalAccidentComponent,
    PersonalResultComponent,
    PersonalQuoteComponent,
    PersonalInfoComponent,
    TicketFormComponent,
    GroupResComponent,
    GroupTicketComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [WelcomeService, TravelerService, UIService, OdooService, SiteSettingsService, ValidationService],
  bootstrap: [AppComponent],
  entryComponents: [AgeTravelerComponent, GroupAgeComponent]
})
export class AppModule {}