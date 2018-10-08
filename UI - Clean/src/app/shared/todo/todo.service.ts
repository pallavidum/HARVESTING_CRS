import {Injectable} from '@angular/core';
import {Todo} from "./index";

@Injectable()
export class TodoService {

  private items: Todo[] = [

    new Todo('Hey.. Attach your new file'),
    new Todo('New Attachment has error'),
    new Todo('Have to submit early'),
    new Todo('10 pages has to be completed'),
    new Todo('Navigation working'),
    new Todo('Files submited successfully'),
    new Todo('Work Complete Before Time'),
  ];

    constructor() {}

  getTodoList() {
    return this.items;
  }


  deleteItem(item: Todo) {
      this.items.splice(this.items.indexOf(item), 1);
  }

  additem(item: Todo) {
        this.items.push(item);
    }
}
