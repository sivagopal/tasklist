import { Component, Input, Pipe, PipeTransform, Directive, OnInit, HostListener} from '@angular/core';

interface Task {
    name: string;
    deadline: Date;
    queued: boolean;
    hoursLeft: number;
}

class TasksService {
    public taskStore: Array<Task> = [];
    constructor() {
      const tasks = [
        {
          name : 'Code and HTML table',
          deadline : 'Jun 23 2015',
          hoursLeft : 1
        },
        {
          name : 'Sketch a wireframe for the new homepage',
          deadline : 'Jun 24 2016',
          hoursLeft : 2
        },
        {
          name : 'Style table with bootstrap styles',
          deadline : 'Jun 25 2016',
          hoursLeft : 1
        }
      ];

      this.taskStore = tasks.map( task => {
        return {
          name : task.name,
          deadline : new Date(task.deadline),
          queued : false,
          hoursLeft : task.hoursLeft
        };
      });
    }
}

@Component( {
    selector: 'tasks',
    styleUrls: ['./tasks.css'],
    templateUrl: './tasks.html'
})
export class TaskComponent {
    today: Date;
    queuedTasks: number;
    tasks: Task[];
    queuedHeaderMapping: any = {
        '=0' : 'No tasks',
        '=1' : 'One Task',
        'other' : '#tasks'
    };
    constructor() {
        const taskService: TasksService = new TasksService();
        this.tasks = taskService.taskStore;
        this.today = new Date();
        this.updateQueuedTasks();
    }
    toggleTask(task: Task) {
        task.queued = !task.queued;
        this.updateQueuedTasks();
    }

    private updateQueuedTasks() {
        this.queuedTasks = this.tasks
          .filter( Task => Task.queued )
          .reduce((hoursLeft: number, queuedTask: Task) => {
            return hoursLeft + queuedTask.hoursLeft;
          }, 0);
      }
}
