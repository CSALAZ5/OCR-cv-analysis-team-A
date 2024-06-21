import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetalleCvComponent } from './components/home/detalle-cv/detalle-cv.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'ScanTalent'}
  },{
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
