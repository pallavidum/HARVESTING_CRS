import {Routes} from '@angular/router';

export const InvoiceRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Invoice',
      status: false
    },
    children: [
      {
        path: 'basic-invoice',
        loadChildren: './basic-invoice/basic-invoice.module#InvoiceBasicModule'
      }, {
        path: 'summary',
        loadChildren: './summary/summary.module#SummaryModule'
      }, {
        path: 'list',
        loadChildren: './list/list.module#ListInvoiceModule'
      }
    ]
  }
]
