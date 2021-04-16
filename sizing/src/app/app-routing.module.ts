import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {StepperComponent} from './components/stepper/stepper.component';
import {SizingComponent} from './components/sizing/sizing.component';
import {ComponentComponent} from './components/component/component.component';
import {RequestsComponent} from './components/requests/requests.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'sizings',
    component: SizingComponent
  },
  {
    path: 'components',
    component: ComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
