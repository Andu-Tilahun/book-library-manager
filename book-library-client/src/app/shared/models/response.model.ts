export interface ApiResponse<T = undefined> {
  data?: T;
  error?: GlobalError;
  validationErrors?: Array<ValidationError>;
  correlationId?: string;
}

export interface GlobalError {
  code?: string;
  message?: string;
}

export interface ValidationError {
  code: string;
  field: string;
}
