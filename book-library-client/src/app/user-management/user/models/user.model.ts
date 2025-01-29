import {ApiResponse} from "@model/response.model";

export interface User {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: UserGender;
  phoneNumber: string;
  email: string;
  role: Role;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}

export interface CreateUserResponse {
  message: string;
}

export interface UpdateUserResponse {
  message: string;
}

export type SearchUserResponse = ApiResponse<Array<User>>;

export enum UserGender {
  MALE="MALE",
  FEMALE="FEMALE",
}

export enum Role {
  ADMIN="ADMIN",
  READER="ADMIN",
}


