import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TaskComponent } from './pages/task/task.component';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    TaskComponent,
    CardTaskComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ]
})
export class TodoModule { }
