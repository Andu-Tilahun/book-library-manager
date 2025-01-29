import { ApiResponse } from '@model/response.model';

export const ApiUtil = {
  hasAnyError<T>(apiResponse: ApiResponse<T>): boolean {
    return (
      this.hasGlobalError(apiResponse) || this.hasValidationError(apiResponse)
    );
  },

  hasGlobalError<T>(apiResponse: ApiResponse<T>): boolean {
    return !!apiResponse.error;
  },

  hasValidationError<T>(apiResponse: ApiResponse<T>): boolean {
    return !!apiResponse.validationErrors;
  },
};
