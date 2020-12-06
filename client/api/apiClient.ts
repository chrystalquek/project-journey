import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoginArgs, LoginResponse } from '../actions/user';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

class ApiClient {
  private axiosInstance: AxiosInstance

  constructor(
    endpoint: string,
  ) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  async userLogin(request: LoginArgs): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'get');
  }

  protected async send(request: any, path: string, method: HttpMethod) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = { headers };

    switch (method) {
      case 'get':
        return (await this.axiosInstance.get(path, config)).data;
      default:
        return Promise.resolve();
    }
  }
}

const sharedClient: ApiClient = new ApiClient('http://localhost:5000');
export default sharedClient;
