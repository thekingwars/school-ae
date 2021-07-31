import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderNavigationService } from 'src/app/services/utils/loader-navigation.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {

  constructor(private router: Router, public loader: LoaderNavigationService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.loader.showSpinner();  
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.loader.hideSlow();
      }
    }, () => {
      this.loader.hideSlow();
    })
  }

  ngOnDestroy(): void {
    this.loader.hideSlow();
  }
}
