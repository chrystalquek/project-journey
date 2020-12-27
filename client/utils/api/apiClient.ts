import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoginRequest } from '@utils/api/request';
import { GetAllEventsResponse, GetVolunteersResponse, LoginResponse } from '@utils/api/response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  getAllVolunteers(): Promise<GetVolunteersResponse>
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

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // volunteer
  async getAllVolunteers(): Promise<GetVolunteersResponse> {
    return this.send({}, 'volunteer', 'get');
  }

  async getAllEvents(): Promise<GetAllEventsResponse> {
    return this.send({}, 'event/multiple/all', 'get');
  }

  protected async send(request: any, path: string, method: HttpMethod) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
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

const urlBaseEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api-dot-journey-288113.et.r.appspot.com/';
const sharedClient: AxiosApiClient = new AxiosApiClient(urlBaseEndpoint);
export default sharedClient;
