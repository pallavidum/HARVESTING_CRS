import {Routes} from '@angular/router';

export const EditorRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Editor',
      status: false
    },
    children: [
      {
        path: 'froala-edit',
        loadChildren: './froala-edit/froala-edit.module#FroalaEditModule'
      }, {
        path: 'quill-edit',
        loadChildren: './quill-edit/quill-edit.module#QuillEditModule'
      }
    ]
  }
]
