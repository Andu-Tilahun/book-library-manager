/**
 * Representation for Data Table Columns
 */
export interface DataTableColumn<T> {
  /**
   * Header for a table column
   */
  header: string;

  /**
   * variable name from the input data
   */
  columnReference?: string;

  /**
   * a function that returns the value of the column from input data as a string.
   * Note: It has precedence over @columnReference
   * @param rowData
   */
  value?(rowData: T): any;

  columnType?: ColumnType;

  columnAction?(rowData: T): void;

  nestedColumn?: NestedActionColumn<T>[];

  defaultValue?: any;
  disabled?: boolean;

}

interface NestedActionColumn<T> {
  value?(rowData: T): any;
  columnType?: ColumnType;
  columnAction?(rowData: T): void;
}

export enum ColumnType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  BUTTON = 'BUTTON',
  CHECK_BOX = 'CHECK_BOX',
  TEMPLATE = 'TEMPLATE',
}

export interface MenuOptions{
  title:string;
  id:string;
}
