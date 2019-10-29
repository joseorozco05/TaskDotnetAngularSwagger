import { Injectable, Inject } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl:string )
{
}
addTask (task: Task): Observable<Task> {
  return this.http.post<Task>(this.baseUrl+'api/Task', task, httpOptions).pipe(
  tap((newTask: Task) => this.log(`Se Agrego una nueva Tarea/ id=${newTask.id}`)),
  catchError(this.handleError<Task>('addTask'))
  );
  }

getAll():Observable<Task[]>{
return this.http.get<Task[]>(this.baseUrl+'api/Task').pipe(
tap(_=>this.log('Se Consulta la información')),
catchError(this.handleError<Task[]>('getAll',[]))
);
}

  /** GET task by id. Will 404 if id not found */
  get(id: number): Observable<Task>
  {
  const url = `${this.baseUrl + 'api/Task'}/${id}`;
  return this.http.get<Task>(url).pipe(
  tap(_ => this.log(`fetched task id=${id}`)),
  catchError(this.handleError<Task>(`get id=${id}`))
  );
  }

  /** PUT: update the Task on the server */
update (task: Task): Observable<any> {
  const url =`${this.baseUrl + 'api/Task'}/${task.id}`;
  return this.http.put(url, task, httpOptions).pipe(
  tap(_ => this.log(`updated task id=${task.id}`)),
  catchError(this.handleError<any>('task'))
  );
  }

  /** DELETE: delete the task from the server */
delete (task: Task | number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url =
  
  `${this.baseUrl + 'api/Task'}/${id}`;
  
  return this.http.delete<Task>(url, httpOptions).pipe(
  tap(_ => this.log(`deleted task id=${id}`)),
  catchError(this.handleError<Task>('deleteTask'))
  );
  }

  /* GET heroes whose name contains search term 
searchTask(id: number): Observable<Task> {
  if (!id) {
    // if not search term, return empty hero array.
    return of();
  }
  return this.http.get<Task>(`${this.baseUrl+'api/task'}/${id}`).pipe(
    tap(_ => this.log(`Se encontro la tarea ${id}`)),
    catchError(this.handleError<Task>(`searchTask id=${id}`))
  );
}*/

/** DELETE: delete the Task from the server 
deleteTask(task: Task | number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.baseUrl+'api/task'}/${id}`;

  return this.http.delete<Task>(url, httpOptions).pipe(
    tap(_ => this.log(`Se eliminó la tarea con id=${id}`)),
    catchError(this.handleError<Task>('deleteTask'))
  );
}*/

/** PUT: update the hero on the server 
updateTask(task: Task): Observable<any> {
  return this.http.put(this.baseUrl+'api/task', task, httpOptions).pipe(
    tap(_ => this.log(`Se actualizo la tarea con id=${task.id}`)),
    catchError(this.handleError<any>('updateTask'))
  );
}*/

private log(message: string) {
  alert(`TaskService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
    };
    }
}
