import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {Role, SearchUserResponse, User} from "@app/user-management/user/models/user.model";
import {Endpoints} from "@core/models/endpoint.model";
import {ApiResponse} from "@model/response.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpService: HttpService) {
  }

  fetchAllUser(): Observable<SearchUserResponse> {
    return this.httpService.get<SearchUserResponse>(
      Endpoints.USER_ENDPOINT
    );
  }


  createUser(request: User): Observable<ApiResponse<void>> {
    return this.httpService.post<ApiResponse<void>>(
      Endpoints.USER_ENDPOINT,
      request,
    );
  }

  getUserById(id: any): Observable<User> {
    return this.httpService.get<User>(
      Endpoints.USER_ENDPOINT + '/' + id,
    );
  }



}

