export interface Alert {
  type: string;
  message: string;
}

export enum AlertType {
  SUCCESS = 'success',
  DANGER = 'danger',
}

