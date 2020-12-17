import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoginRequest } from './request';
import { GetVolunteersResponse, LoginResponse } from './response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  getAllVolunteers(): Promise<GetVolunteersResponse>
}

class AxiosApiClient implements ApiClient {
  private axiosInstance: AxiosInstance

  constructor(
    endpoint: string,
  ) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // volunteer
  async getAllVolunteers(): Promise<GetVolunteersResponse> {
    return this.send({}, 'volunteer', 'get');
  }

  protected async send(request: any, path: string, method: HttpMethod) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (process.env.NODE_ENV === 'development') {
      headers['Access-Control-Allow-Origin'] = '*';
    }

    const config: AxiosRequestConfig = { headers };

    switch (method) {
      case 'get':
        return (await this.axiosInstance.get(path, config)).data;
      case 'post':
        return (await this.axiosInstance.post(path, request, config)).data;
      case 'put':
        return (await this.axiosInstance.put(path, request, config)).data;
      case 'delete':
        return (await this.axiosInstance.delete(path, config)).data;
      default:
        return Promise.resolve(); // best way to handle this?
    }
  }
}

// TODO: Replace with .env endpoint
const sharedClient: AxiosApiClient = new AxiosApiClient('http://localhost:5000');
export default sharedClient;
