import {Role} from "@core/models/role.model";
import {Privilege} from "@core/models/privilege.model";

export class UserDetails {
  id?: string;
  username = '';
  firstName = '';
  middleName = '';
  lastName = '';
  email: string = '';
  phoneNumber: string = '';
  role: Role[] = [];
  csrfToken = '';
  privilege: Privilege [] = [];
}

