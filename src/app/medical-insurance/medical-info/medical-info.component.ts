import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicalService } from '../medical.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.css']
})
export class MedicalInfoComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  displayedColumns: string[] = ['cover', 'Elite', 'Prestige', 'Blue'];
  loadMedicalInfoSub: Subscription;
  type: string;
  date: string;
  objMedicalInfo;
  constructor(private medicalService: MedicalService, private router: Router, private activatedParam: ActivatedRoute) { 
  }

  ngOnInit() {
    this.activatedParam.queryParamMap.subscribe(param => {
        this.type = param.get('type');
        this.date = param.get('date');

      this.loadMedicalInfoSub = this.medicalService.loadMedicalInfo.subscribe(info => {
        this.objMedicalInfo = info;
      });
      if(this.type === 'individual') {
        this.medicalService.getTabels(this.type, this.date);
      } else if(this.type === 'family') {
        const date_arr = this.date.split(',');
        console.log('data', date_arr);
        this.medicalService.getTabels(this.type, date_arr);
      } else if(this.type === 'smes') {
        let new_arr = this.date.split('-');
        let new_arr2 = [];
        new_arr.map(function(val) {
          new_arr2.push(JSON.parse(val));
        });

        this.medicalService.getTabels(this.type, new_arr2);
      }
    });
    
    
  }

  chkIfTrueOrFalse(val) {
    if(typeof(val) == 'boolean') {

      if(val == true) {
        return true;
      } else {
        return false;
      }

    } else if(val == '') {
      return 'ـــ';
    } else {
      return val;
    }
  }

  onClick(type) {
    this.medicalService.onClickPlan(type);
  }

  ngOnDestroy() {
    if(this.loadMedicalInfoSub) this.loadMedicalInfoSub.unsubscribe();
  }

}
