import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';

describe('HttpService', () => {
  let httpService: HttpService;

  let mockHttp: jasmine.SpyObj<HttpClient>;

  const endpoint = 'request/url';
  const mockApiUrl = 'http://localhost/request-url';

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    httpService = new HttpService(mockHttp);

    spyOn<any>(httpService, 'getApiEndpoint').and.returnValue(mockApiUrl);
  });

  describe('#get', () => {
    it('should trigger a GET call', () => {
      httpService.get(endpoint);
      expect(mockHttp.get).toHaveBeenCalledWith(mockApiUrl);
    });
  });

  describe('#post', () => {
    it('should trigger a GET call', () => {
      const requestBody = {} as any;
      httpService.post(endpoint, requestBody);
      expect(mockHttp.post).toHaveBeenCalledWith(mockApiUrl, requestBody);
    });
  });

  describe('#put', () => {
    it('should trigger a PUT call', () => {
      const requestBody = {} as any;
      httpService.put(endpoint, requestBody);
      expect(mockHttp.put).toHaveBeenCalledWith(mockApiUrl, requestBody);
    });
  });

  describe('#delete', () => {
    it('should trigger a DELETE call', () => {
      httpService.delete(endpoint);
      expect(mockHttp.delete).toHaveBeenCalledWith(mockApiUrl);
    });
  });
});
