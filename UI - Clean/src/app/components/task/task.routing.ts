import {Routes} from '@angular/router';

export const TaskRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Task',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: './list/list.module#ListModule'
      }, {
        path: 'board',
        loadChildren: './board/board.module#BoardModule'
      }, {
        path: 'details',
        loadChildren: './details/details.module#DetailsModule'
      }, {
        path: 'issue',
        loadChildren: './issue/issue.module#IssueModule'
      }
    ]
  }
]
