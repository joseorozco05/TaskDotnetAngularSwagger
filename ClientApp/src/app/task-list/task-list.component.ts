import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.taskservice.getAll().subscribe(tasks=>this.tasks=tasks);
    }

}
