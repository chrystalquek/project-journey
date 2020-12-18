import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoginRequest } from './request';
import {GetAllEventsResponse, LoginResponse} from './response';
import {EventData} from "@type/event";

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  getAllEvents(): Promise<GetAllEventsResponse>
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

  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  async getAllEvents(): Promise<GetAllEventsResponse> {
    return this.send(null, 'event/multiple/all', 'get');
  }

  protected async send(request: any, path: string, method: HttpMethod) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

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
