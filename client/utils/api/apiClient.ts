import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  LoginRequest, CreateEventRequest, EditEventRequest, GetEventParams, QueryParams, SignupRequest,
} from './request';
import {
  GetAllEventsResponse, GetVolunteersResponse, LoginResponse,
  CreateEventResponse, EditEventResponse, GetEventResponse, SignupResponse,
} from './response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  createEvent(request: CreateEventRequest): Promise<CreateEventResponse>
  getEvent(request: GetEventParams): Promise<GetEventParams>
  editEvent(request: EditEventRequest): Promise<EditEventResponse>
getVolunteers(query: QueryParams): Promise<GetVolunteersResponse>
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

  private toURLParams = (query: QueryParams) => `?${new URLSearchParams(query).toString()}`

  // create user
  async signup(request: SignupRequest): Promise<SignupResponse> {
    return this.send(request, 'volunteer', 'post');
  }

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // volunteer
  async getVolunteers(query: QueryParams): Promise<GetVolunteersResponse> {
    return this.send({}, `volunteer/${this.toURLParams(query)}`, 'get');
  }

  async getAllEvents(): Promise<GetAllEventsResponse> {
    return this.send({}, 'event/multiple/all', 'get');
  }

  // admin post event
  async createEvent(request: CreateEventRequest): Promise<CreateEventResponse> {
    return this.send(request, 'event', 'post');
  }

  async getEvent(query: GetEventParams): Promise<GetEventResponse> {
    return this.send({}, `event/single/${query}`, 'get');
  }

  async editEvent(request: EditEventRequest): Promise<EditEventResponse> {
    return this.send(request, 'event', 'put');
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
