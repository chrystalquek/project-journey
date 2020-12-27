import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { LoginRequest, QueryParams } from './request';
import { GetCountResponse, GetEventsResponse, GetSignUpsResponse, GetVolunteersResponse, LoginResponse } from './response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  getVolunteers(query: QueryParams): Promise<GetVolunteersResponse>
  getSignUps(query: QueryParams): Promise<GetSignUpsResponse>
  getSignedUpEvents(query: QueryParams): Promise<GetEventsResponse>
  getEvents(query: QueryParams): Promise<GetEventsResponse>
  getPendingSignUps(): Promise<GetCountResponse>
  getPendingVolunteers(): Promise<GetCountResponse>
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

  private toURLParams = (query: QueryParams) => {
    return "?" + new URLSearchParams(query).toString();
  }

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // volunteer
  async getVolunteers(query: QueryParams): Promise<GetVolunteersResponse> {
    return this.send({}, `volunteer/${this.toURLParams(query)}`, 'get');
  }

  async getSignUps(query: QueryParams): Promise<GetSignUpsResponse> {
    return this.send({}, `signup/${query.id}/${query.idType}`, 'get');
  }

  async getSignedUpEvents(query: QueryParams): Promise<GetEventsResponse> {
    return this.send({}, `event/signup/${query.userId}/${query.eventType}`, 'get');
  }

  async getEvents(query: QueryParams): Promise<GetEventsResponse> {
    return this.send({}, `event/multiple/${query.eventType}`, 'get');
  }

  async getPendingSignUps(): Promise<GetCountResponse> {
    return this.send({}, `signup/pending`, 'get');
  }

  async getPendingVolunteers(): Promise<GetCountResponse> {
    return this.send({}, `volunteer/pending`, 'get');
  }

  protected async send(request: any, path: string, method: HttpMethod) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
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

const urlBaseEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api-dot-journey-288113.et.r.appspot.com/';
const sharedClient: AxiosApiClient = new AxiosApiClient(urlBaseEndpoint);
export default sharedClient;
