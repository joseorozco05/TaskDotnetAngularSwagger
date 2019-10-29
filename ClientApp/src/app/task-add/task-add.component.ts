import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})

export class TaskAddComponent implements OnInit {
  constructor(private taskService: TaskService) { }
task: Task;
ngOnInit() {
this.task = { id: 0, title: '', description: '', priority: false };
}
add() {
this.taskService.addTask(this.task)
.subscribe(task => {
alert('Se agrego una nueva tarea')
});
}


}