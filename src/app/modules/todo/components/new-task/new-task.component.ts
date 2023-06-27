import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../interfaces/task.interface';
import { format } from 'date-fns';
import locale from 'date-fns/locale/es';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {

  @ViewChild('modalTask') modal!: TemplateRef<any>;
  @Output() addTask: EventEmitter<Task> = new EventEmitter();

  sending:boolean = false;
  today = format(new Date(), 'yyyy-MM-dd', { locale });

  taskForm:FormGroup = this.fb.group({
    id:          [0],
    title:       ['', Validators.required],
    description: ['', Validators.required],
    date:        [this.today, Validators.required],
  });

  get btnTxt(){
    return this.taskForm.get('id')?.value ? 'Actualizar' : 'Crear';
  }

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastr:ToastrService
  ) {}

  openModal() {
    this.modalService.show(this.modal, {backdrop: 'static'});
  }

  modalClose(){
    this.modalService.hide();
    this.formReset();
  }

  edit(task:Task){
    this.taskForm.patchValue(task);
    this.openModal();
  }

  onSubmit(){
    this.sending = true;

    this.taskService.createOrUpdate(this.taskForm.value).subscribe({
      next: (resp:any) => this.success(resp),
      error: (err:any) => this.toastr.error(err.message, 'Error'),
      complete: () => this.sending = false
    })
  }

  success(resp:any){
    this.toastr.success(resp.message, 'Success');
    this.addTask.emit(resp.data);
    this.modalClose();
  }

  formReset(){
    this.taskForm.reset({
      id: 0,
      title: '',
      description: '',
      date: this.today
    });
  }


}
