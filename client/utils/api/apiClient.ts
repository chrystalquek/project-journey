import { CommitmentApplicationData } from '@type/commitmentApplication';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  LoginRequest, CreateEventRequest, EditEventRequest, GetEventParams, QueryParams,
  SignUpRequest, UploadImageRequest,
} from './request';
import {
  GetEventsResponse, GetSignUpsResponse, GetVolunteersPaginatedResponse,
  GetCommitmentApplicationResponse, GetVolunteersResponse, LoginResponse, CreateEventResponse,
  EditEventResponse, GetEventResponse, SignUpResponse, UploadImageResponse,
} from './response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  createEvent(request: CreateEventRequest): Promise<CreateEventResponse>
  getEvent(request: GetEventParams): Promise<GetEventResponse>
  editEvent(request: EditEventRequest): Promise<EditEventResponse>
  getVolunteers(query: QueryParams): Promise<GetVolunteersPaginatedResponse>
  getSignUps(query: QueryParams): Promise<GetSignUpsResponse>
  getSignedUpEvents(query: QueryParams): Promise<GetEventsResponse>
  getEvents(query: QueryParams): Promise<GetEventsResponse>
  getPendingSignUps(): Promise<GetSignUpsResponse>
  getPendingVolunteers(): Promise<GetVolunteersResponse>
  getCommitmentApplications(query: QueryParams): Promise<GetCommitmentApplicationResponse>
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
  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.send(request, 'volunteer', 'post');
  }

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // sign up
  async getSignUps(query: QueryParams): Promise<GetSignUpsResponse> {
    return this.send({}, `signup/${query.id}/${query.idType}`, 'get');
  }

  async getPendingSignUps(): Promise<GetSignUpsResponse> {
    return this.send({}, 'signup/pending', 'get');
  }

  // event
  async getSignedUpEvents(query: QueryParams): Promise<GetEventsResponse> {
    return this.send({}, `event/signup/${query.userId}/${query.eventType}`, 'get');
  }

  // admin post event
  async createEvent(request: CreateEventRequest): Promise<CreateEventResponse> {
    return this.send(request, 'event', 'post');
  }

  async getEvent(query: GetEventParams): Promise<GetEventResponse> {
    return this.send({}, `event/single/${query}`, 'get');
  }

  async editEvent({ id, data }: EditEventRequest): Promise<EditEventResponse> {
    console.log(data);
    console.log('thats the data');
    return this.send(data, `event/${id}`, 'put');
  }

  async getEvents(query: QueryParams): Promise<GetEventsResponse> {
    return this.send({}, `event/multiple/${query.eventType}`, 'get');
  }

  // volunteer
  async getVolunteers(query: QueryParams): Promise<GetVolunteersPaginatedResponse> {
    return this.send({}, `volunteer/${this.toURLParams(query)}`, 'get');
  }

  async getPendingVolunteers(): Promise<GetVolunteersResponse> {
    return this.send({}, 'volunteer/pending', 'get');
  }

  // commitment application
  async getCommitmentApplications(query: QueryParams): Promise<GetCommitmentApplicationResponse> {
    return this.send({}, `commitment-application/${this.toURLParams(query)}`, 'get');
  }

  async updateCommitmentApplication(data: CommitmentApplicationData): Promise<void> {
    return this.send(data, `commitment-application/${data._id}`, 'put');
  }

  // upload image
  async uploadImage(request: UploadImageRequest): Promise<UploadImageResponse> {
    return this.send(request, 'image', 'post', true);
  }

  protected async send(request: any, path: string, method: HttpMethod,
    isImageUpload: boolean = false) {
    const headers: Record<string, string> = {
      'Content-Type': isImageUpload ? 'multipart/form-data' : 'application/json',
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
