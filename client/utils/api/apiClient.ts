import { CommitmentApplicationData } from '@type/commitmentApplication';
import { VolunteerData } from '@type/volunteer';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  LoginRequest,
  CreateEventRequest,
  EditEventRequest,
  GetEventParams,
  SignUpRequest,
  UploadImageRequest,
  CreateSignUpRequest,
  UpdateSignUpRequest,
  SignUpQueryParams,
  UpdateVolunteerRequest,
  CreateCommitmentApplicationRequest,
  CommitmentApplicationQueryParams,
  EventQueryParams,
  VolunteerPaginatedQueryParams,
  AnswerFormQuestionsRequest,
  CreateFormQuestionsRequest,
  CancelEventParams,
} from '@utils/api/request';

import {
  GetEventsResponse, GetSignUpsResponse, GetVolunteersResponse, LoginResponse, CreateEventResponse,
  EditEventResponse, GetEventResponse, SignUpResponse, UploadImageResponse,
  CreateSignUpResponse, UpdateSignUpResponse,
  GetVolunteersPaginatedResponse, GetCommitmentApplicationResponse, CreateUpdateSignUpResponse, GetEventFeedbackQuestionsResponse,
} from '@utils/api/response';
import { SignUpIdType } from '@type/signUp';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface ApiClient {
  login(request: LoginRequest): Promise<LoginResponse>
  createEvent(request: CreateEventRequest): Promise<CreateEventResponse>
  getEvent(request: GetEventParams): Promise<GetEventResponse>
  editEvent(request: EditEventRequest): Promise<EditEventResponse>
  cancelEvent(request: CancelEventParams): Promise<void>
  getVolunteers(query: VolunteerPaginatedQueryParams): Promise<GetVolunteersPaginatedResponse>
  getSignUps(query: SignUpQueryParams): Promise<GetSignUpsResponse>
  deleteSignUp(query: SignUpQueryParams): Promise<void>
  getSignedUpEvents(query: EventQueryParams): Promise<GetEventsResponse>
  getEvents(query: EventQueryParams): Promise<GetEventsResponse>
  getPendingSignUps(): Promise<GetSignUpsResponse>
  getPendingVolunteers(): Promise<GetVolunteersResponse>
  getEventFeedbackQuestions(eventId: string): Promise<GetEventFeedbackQuestionsResponse>
  getCommitmentApplications(query: CommitmentApplicationQueryParams):
    Promise<GetCommitmentApplicationResponse>
  updateVolunteer(request: UpdateVolunteerRequest): Promise<VolunteerData>
  submitEventFeedback(request: AnswerFormQuestionsRequest): Promise<void>
  createForm(request: CreateFormQuestionsRequest): Promise<void>
}

class AxiosApiClient implements ApiClient {
  private axiosInstance: AxiosInstance;

  private token: string = '';

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  private toURLParams = (query) => `?${new URLSearchParams(query).toString()}`

  public setAuthToken(token: string): void {
    this.token = token;
  }

  // create user
  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.send(request, 'volunteer', 'post');
  }

  // user auth
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, 'user/login', 'post');
  }

  // sign up
  async getSignUps(query: SignUpQueryParams): Promise<GetSignUpsResponse> {
    return this.send({}, `signup/${query.id}/${query.idType}`, 'get');
  }

  async getPendingSignUps(): Promise<GetSignUpsResponse> {
    return this.send({}, 'signup/pending', 'get');
  }

  async createSignUp(
    request: CreateSignUpRequest,
  ): Promise<CreateSignUpResponse> {
    return this.send(request, 'signup', 'post');
  }

  async updateSignUp(query: SignUpQueryParams, request: UpdateSignUpRequest):
  Promise<UpdateSignUpResponse> {
    return this.send(request, `signup/${query.id}/${query.idType}`, 'put');
  }

  async createAndUpdateSignUp(acceptedRole: string, request: CreateSignUpRequest): Promise<CreateUpdateSignUpResponse> {
    return this.createSignUp(request)
      .then((res) => {
        const newRequest: UpdateSignUpRequest = {
          ...request,
          status: ['accepted', acceptedRole],
        };
        const newQuery = {
          id: res.signUpId,
          idType: 'signUpId' as SignUpIdType,
        };
        return this.updateSignUp(newQuery, newRequest);
      });
  }

  async deleteSignUp(query: SignUpQueryParams): Promise<void> {
    return this.send({}, `signup/${query.id}/${query.idType}`, 'delete');
  }

  // event
  async getSignedUpEvents(query: EventQueryParams): Promise<GetEventsResponse> {
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
    return this.send(data, `event/${id}`, 'put');
  }

  async getEvents(query: EventQueryParams): Promise<GetEventsResponse> {
    return this.send({}, `event/multiple/${query.eventType}`, 'get');
  }

  // volunteer
  async getVolunteerById(id: string): Promise<VolunteerData> {
    return this.send({}, `volunteer/id/${id}`, 'get');
  }

  async getVolunteers(query: VolunteerPaginatedQueryParams):
    Promise<GetVolunteersPaginatedResponse> {
    return this.send({}, `volunteer/${this.toURLParams(query)}`, 'get');
  }

  async cancelEvent({ eventId }): Promise<void> {
    return this.send({ }, `event/${eventId}`, 'put');
  }

  async getPendingVolunteers(): Promise<GetVolunteersResponse> {
    return this.send({}, 'volunteer/pending', 'get');
  }

  async getEventFeedbackQuestions(eventId: string): Promise<GetEventFeedbackQuestionsResponse> {
    return this.send({}, `form/${eventId}`, 'get');
  }

  async submitEventFeedback(request: AnswerFormQuestionsRequest): Promise<void> {
    return this.send(request, 'form/answer', 'post');
  }

  async createForm(request: CreateFormQuestionsRequest): Promise<void> {
    return this.send(request, 'form', 'post');
  }

  async updateVolunteer(request: UpdateVolunteerRequest): Promise<VolunteerData> {
    return this.send(request, 'volunteer', 'put');
  }

  async updateProfilePicture(request: UploadImageRequest): Promise<VolunteerData> {
    return this.send(request, 'image/profile-picture', 'post', true);
  }

  // commitment application
  async createCommitmentApplication(request: CreateCommitmentApplicationRequest):
  Promise<CommitmentApplicationData> {
    return this.send(request, 'commitment-application', 'post');
  }

  async getCommitmentApplications(query: CommitmentApplicationQueryParams):
    Promise<GetCommitmentApplicationResponse> {
    return this.send({}, `commitment-application/${this.toURLParams(query)}`, 'get');
  }

  async updateCommitmentApplication(
    data: CommitmentApplicationData,
  ): Promise<void> {
    return this.send(data, `commitment-application/${data._id}`, 'put');
  }

  async getVolunteersById(ids) {
    return this.send({ ids }, 'volunteer/ids', 'post');
  }

  async getSignUpsByEventId(eid) {
    return this.send({ eid }, `signup/${eid}/eventId`, 'get');
  }

  async uploadImage(request: UploadImageRequest): Promise<UploadImageResponse> {
    return this.send(request, 'image', 'post', true);
  }

  protected async send(
    request: any,
    path: string,
    method: HttpMethod,
    isImageUpload: boolean = false,
  ) {
    const headers: Record<string, string> = {
      'Content-Type': isImageUpload
        ? 'multipart/form-data'
        : 'application/json',
    };

    if (process.env.NODE_ENV === 'development') {
      headers['Access-Control-Allow-Origin'] = '*';
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
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

const urlBaseEndpoint = process.env.NEXT_PUBLIC_ENV === 'development' ? 'http://localhost:5000' : (process.env.NEXT_PUBLIC_ENV === 'production' ? 'https://api-prod-dot-journey-288113.et.r.appspot.com/' : 'https://api-dot-journey-288113.et.r.appspot.com/');
const sharedClient: AxiosApiClient = new AxiosApiClient(urlBaseEndpoint);
export default sharedClient;
