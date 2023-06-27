import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { Usuario } from 'src/app/modules/auth/model/User.model';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { tasksConst } from '../../../../shared/constants/tasks.contants';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild(NewTaskComponent) editTask!: NewTaskComponent;

  user:Usuario = {
    id: 0,
    name: '',
    email: ''
  };

  totalTask = {
    pending: 0,
    completed: 0,
    total: 0
  }

  tasks:Task[] = [];
  loading:boolean = false;
  active:string = "all";

  constructor(
    private taskService:TaskService,
    private userService:UserService,
    private router:Router
  ){ }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.getTasks(null);
  }

  //Methods---------------------------------------------------------------------------------

  getTasks(status:boolean | null = null){
    this.loading = true;

    this.taskService.getTasks(status).subscribe({
      next: (resp) => this.tasks = resp,
      error: err => console.error(err),
      complete: () =>{
        this.loading = false;
        this.getTotals();
      }
    });
  }


  getTotals(){
    this.taskService.getTotals()
    .subscribe((resp:any) => this.totalTask = resp);
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  changeStatus(title:string, status:boolean | null = null){
    this.active = title;
    this.getTasks(status);
  }


  addTask(task:Task){
    this.getTotals();
    if(this.active === 'completed') return;

    //Solo actualizamos si estamos en pendientes o todas
    const index = this.tasks.findIndex(t => t.id === task.id);
    if(index == tasksConst.NOT_INDEX) this.tasks.unshift(task);
    else this.tasks[index] = task;
  }


  emitTask(task:Task){
    this.editTask.edit(task);
  }


  removeTask(id:number){
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.getTotals();
  }


}
