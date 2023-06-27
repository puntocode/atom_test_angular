import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { from, lastValueFrom } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {
  @Input() task: any;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<Task> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  changing:boolean = false;


  get taskClass(){
    return this.task.completed ? 'bg-completed' : 'bg-pending';
  }

  get iconClass(){
    return this.task.completed ? 'bxs-check-circle' : 'bx-circle pointer';
  }


  constructor(
    private taskService:TaskService,
    private toastr:ToastrService
  ) { }


  changeStatus(){
    if(this.task.completed) return;

    this.changing = true;
    this.taskService.updateStatus(this.task.id).subscribe({
      next: (resp:any) => this.task.completed = true,
      error: (err:any) => this.toastr.error(err.error.message, 'Error'),
      complete: () => {
        this.changing = false;
        this.toastr.success('La tarea se ha completado', 'Success');
        this.onChange.emit();
      }
    })
  }

  editTask(){
    this.edit.emit(this.task);
  }

  async showDeleteQuestion(){
    const option:SweetAlertOptions = {
        title: '¿Estas seguro?',
        text: "No podras revertir esta acción",
        icon: 'error',
        showCancelButton: true,
        cancelButtonColor: '#627d98',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#e12d3a',
      };

    const swal$ = from(Swal.fire(option));
    const result = await lastValueFrom(swal$);

    if(result.isConfirmed) this.deleteTask();
  }

  deleteTask(){
    this.taskService.delete(this.task.id).subscribe({
      next: (resp:any) => this.toastr.success(resp.message, 'Success'),
      error: (err:any) => this.toastr.error(err.error.message, 'Error'),
      complete: () => this.remove.emit(this.task.id)
    });
  }

}

