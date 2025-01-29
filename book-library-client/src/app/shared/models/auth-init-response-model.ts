import { ApiResponse } from '@model/response.model';
import { User } from '@app/user-management/user/models/user.model';

export interface AuthInitResponse {
  user: User;
  csrfToken: string;
}

export type ResponseAuthInitResponse = ApiResponse<AuthInitResponse>;
