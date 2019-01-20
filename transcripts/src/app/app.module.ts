import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { AppComponent } from './app.component';
import {LoginService} from './login.service';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
//import {PopupModule} from 'ng2-opd-popup';
//import {ModalService} from './modal.service';
//import { ModalComponent } from './modal/modal.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { AlertsModule } from 'angular-alert-module';
import { AgGridModule } from 'ag-grid-angular';
import { CollegedashboardComponent } from './collegedashboard/collegedashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { ChildMessageRendererComponent } from './child-message-renderer/child-message-renderer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import { ViewTranscriptComponent } from './view-transcript/view-transcript.component';

const routes: Routes = [
	{
	 	path: 'student',
	 	component: StudentdashboardComponent
	},
	{
	 	path: 'college',
	 	component: CollegedashboardComponent 
	},
    {
	  	path: 'admin',
	  	component: AdminDashboardComponent
  	},
    {
	    path: 'home',
	    component: AppComponent
    },
    {
	    path: '',
	    redirectTo: '/home',
	    pathMatch: 'full',
    }
];


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    CollegedashboardComponent,
    StudentdashboardComponent,
    ChildMessageRendererComponent,
    ModalComponent,
    ViewTranscriptComponent
  ],
  imports: [
    SelectDropDownModule,BrowserModule,FormsModule,ReactiveFormsModule,NgbModule.forRoot(),RouterModule.forRoot(routes),AlertsModule.forRoot(),AgGridModule.withComponents([ChildMessageRendererComponent,ViewTranscriptComponent])//, PopupModule.forRoot(),
  ],
  entryComponents: [ModalComponent],
  exports:[
  RouterModule, ReactiveFormsModule,
  ],
  providers: [LoginService],//,ModalService,
  bootstrap: [AppComponent]
})
export class AppModule { }
