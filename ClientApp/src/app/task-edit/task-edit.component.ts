import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task;
  stask:string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService ,
    private location: Location
  ) { this.task = new Task(); }

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.get(id)
      .subscribe( t => this.task = t);
  }

  update(): void {
    this.taskService.update(this.task)
      .subscribe(() => this.goBack());
  }
  delete(): void {
    this.taskService.delete(this.task)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }


}
