export interface Ng2SmartTableEvent {
    cells: Ng2SmartTableCell[];
    data: any;
    index: number;
    isInEditing: boolean;
    isSelected: boolean;
}

export interface Ng2SmartTableCell {
    column: Ng2SmartTableColumn;
    dataSet: Ng2SmartTableDataSet;
    newValue: any;
    row: Ng2SmartTableRow;
    value: any;
}

export interface Ng2SmartTableColumn {
    class: string;
    compareFunction: () => {};
    dataSet: Ng2SmartTableDataSet;
    defaultSortDirection: string;
    editor: any;
    filter: boolean;
    filterFunction: () => {};
    id: string;
    isEditable: boolean;
    isFilterable: boolean;
    isSortable: boolean;
    renderComponent: any;
    settings: Ng2SmartTableSettings;
    sortDirection: any;
    title: string;
    type: string;
    valuePrepareFunction: () => {};
}

export interface Ng2SmartTableDataSet {
    columnSettings: any;
    columns: Ng2SmartTableColumn[];
    data: any[] | any;
    newRow: Ng2SmartTableRow;
    rows: Ng2SmartTableRow[];
    selectedRow: Ng2SmartTableRow;
    willSelect: any;
    defaultSortDirection: any;
    editor: any;
    filter: boolean | any;
    filterFunction: () => {};
    id: string;
    isEditable: boolean;
    isFilterable: boolean;
    isSortable: boolean;
    renderComponent: any;
    settings: Ng2SmartTableSettings;
    sortDirection: string;
    title: string;
    type: string;
    valuePrepareFunction: () => {};
}

export interface Ng2SmartTableRow {
    cells: Ng2SmartTableCell;
    data: any;
    index: number;
    isInEditing: boolean;
    isSelected: boolean;
}

export interface Ng2SmartTableSettings {
    filter: boolean;
    title: string;
    type: string;
}
