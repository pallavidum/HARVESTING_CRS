import {Routes} from '@angular/router';

export const DataTableRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Data Tables',
      status: false
    },
    children: [
      {
        path: 'basic-datatable',
        loadChildren: './basic-datatable/basic-datatable.module#BasicDataTableModule'
      }, {
        path: 'editable',
        loadChildren: './inline-edit/inline-edit.module#InlineEditModule'
      }, {
        path: 'row-details',
        loadChildren: './child-row/child-row.module#ChildRowModule'
      }, {
        path: 'paging',
        loadChildren: './paging/paging.module#PagingModule'
      }, {
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionModule'
      }, {
        path: 'other',
        loadChildren: './other/other.module#OtherModuleDataTable'
      }
    ]
  }
]
