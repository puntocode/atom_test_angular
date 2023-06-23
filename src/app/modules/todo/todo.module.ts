import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TodoRoutingModule } from './todo-routing.module';
import { TaskComponent } from './pages/task/task.component';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { NewTaskComponent } from './components/new-task/new-task.component';


@NgModule({
  declarations: [
    TaskComponent,
    CardTaskComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
  ]
})
export class TodoModule { }
