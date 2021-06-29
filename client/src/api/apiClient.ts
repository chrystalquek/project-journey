import { VolunteerData } from "@type/volunteer";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { SignUpIdType } from "@type/signUp";
import querystring from "querystring";
import {
  LoginRequest,
  CreateEventRequest,
  GetEventsRequest,
  GetSignedUpEventsRequest,
  GetEventRequest,
  UpdateEventRequest,
  DeleteEventRequest,
  CancelEventRequest,
  CreateVolunteerRequest,
  GetVolunteersPaginatedRequest,
  GetVolunteersByIdRequest,
  GetVolunteerRequest,
  UpdateVolunteerRequest,
  CreateSignUpRequest,
  GetSignUpsRequest,
  UpdateSignUpRequest,
  DeleteSignUpRequest,
  CreateCommitmentApplicationRequest,
  GetCommitmentApplicationsRequest,
  UpdateCommitmentApplicationRequest,
  AnswerFormQuestionsRequest,
  CreateFormQuestionsRequest,
  UploadImageRequest,
  GetEventFeedbackQuestionsRequest,
} from "./request";
import {
  LoginResponse,
  CreateEventResponse,
  GetEventsResponse,
  GetEventResponse,
  UpdateEventResponse,
  CreateVolunteerResponse,
  GetVolunteersPaginatedResponse,
  GetVolunteersResponse,
  GetVolunteerResponse,
  UpdateVolunteerResponse,
  CreateSignUpResponse,
  GetSignUpsResponse,
  UpdateSignUpResponse,
  CreateUpdateSignUpResponse,
  CreateCommitmentApplicationResponse,
  GetCommitmentApplicationsResponse,
  UpdateCommitmentApplicationResponse,
  GetEventFeedbackQuestionsResponse,
  UploadImageResponse,
} from "./response";

type HttpMethod = "get" | "post" | "put" | "delete";

class AxiosApiClient {
  private axiosInstance: AxiosInstance;

  private token: string = "";

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  private toURLParams = (query) => `?${querystring.stringify(query)}`;

  public setAuthToken(token: string): void {
    this.token = token;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.send(request, "user/login", "post");
  }

  // event
  async createEvent(request: CreateEventRequest): Promise<CreateEventResponse> {
    return this.send(request, "event", "post");
  }

  async getEvents(request: GetEventsRequest): Promise<GetEventsResponse> {
    return this.send({}, `event/multiple/${request.eventType}`, "get");
  }

  async getSignedUpEvents(
    request: GetSignedUpEventsRequest
  ): Promise<GetEventsResponse> {
    return this.send(
      {},
      `event/signup/${request.userId}/${request.eventType}`,
      "get"
    );
  }

  async getEvent(request: GetEventRequest): Promise<GetEventResponse> {
    return this.send({}, `event/single/${request._id}`, "get");
  }

  async updateEvent(request: UpdateEventRequest): Promise<UpdateEventResponse> {
    return this.send(request.data, `event/${request._id}`, "put");
  }

  async deleteEvent(request: DeleteEventRequest): Promise<void> {
    return this.send({}, `event/${request._id}`, "delete");
  }

  async cancelEvent(request: CancelEventRequest): Promise<void> {
    return this.send({}, `event/cancel/${request._id}`, "put");
  }

  // volunteer

  async createVolunteer(
    request: CreateVolunteerRequest
  ): Promise<CreateVolunteerResponse> {
    return this.send(request, "volunteer", "post");
  }

  async getVolunteers(
    request: GetVolunteersPaginatedRequest
  ): Promise<GetVolunteersPaginatedResponse> {
    return this.send({}, `volunteer/${this.toURLParams(request)}`, "get");
  }

  async getVolunteersById(
    request: GetVolunteersByIdRequest
  ): Promise<GetVolunteersResponse> {
    return this.send(request, "volunteer/ids", "get");
  }

  async getPendingVolunteers(): Promise<GetVolunteersResponse> {
    return this.send({}, "volunteer/pending", "get");
  }

  async getVolunteer(
    request: GetVolunteerRequest
  ): Promise<GetVolunteerResponse> {
    return this.send({}, `volunteer/${request._id}`, "get");
  }

  async updateVolunteer(
    request: UpdateVolunteerRequest
  ): Promise<UpdateVolunteerResponse> {
    return this.send(request.data, `volunteer/${request._id}`, "put");
  }

  // sign up
  async createSignUp(
    request: CreateSignUpRequest
  ): Promise<CreateSignUpResponse> {
    return this.send(request, "signup", "post");
  }

  async getSignUps(request: GetSignUpsRequest): Promise<GetSignUpsResponse> {
    return this.send({}, `signup/${request.id}/${request.idType}`, "get");
  }

  async getPendingSignUps(): Promise<GetSignUpsResponse> {
    return this.send({}, "signup/pending", "get");
  }

  async updateSignUp(
    request: UpdateSignUpRequest
  ): Promise<UpdateSignUpResponse> {
    return this.send(
      request.data,
      `signup/${request.id}/${request.idType}`,
      "put"
    );
  }

  // TODO change this to 1 api call
  async createAndUpdateSignUp(
    acceptedRole: string,
    request: CreateSignUpRequest
  ): Promise<CreateUpdateSignUpResponse> {
    return this.createSignUp(request).then((res) => {
      const newRequest: UpdateSignUpRequest = {
        id: res._id,
        idType: "signUpId" as SignUpIdType,
        data: {
          ...request,
          status: ["accepted", acceptedRole],
        },
      };
      return this.updateSignUp(newRequest);
    });
  }

  async deleteSignUp(request: DeleteSignUpRequest): Promise<void> {
    return this.send({}, `signup/${request.id}/${request.idType}`, "delete");
  }

  // commitment application
  async createCommitmentApplication(
    request: CreateCommitmentApplicationRequest
  ): Promise<CreateCommitmentApplicationResponse> {
    return this.send(request, "commitment-application", "post");
  }

  async getCommitmentApplications(
    request: GetCommitmentApplicationsRequest
  ): Promise<GetCommitmentApplicationsResponse> {
    return this.send(
      {},
      `commitment-application/${this.toURLParams(request)}`,
      "get"
    );
  }

  async updateCommitmentApplication(
    request: UpdateCommitmentApplicationRequest
  ): Promise<UpdateCommitmentApplicationResponse> {
    return this.send(
      request.data,
      `commitment-application/${request._id}`,
      "put"
    );
  }

  // form

  // TODO change this to 1 api call
  async createForm(request: CreateFormQuestionsRequest): Promise<void> {
    return this.send(request, "form", "post");
  }

  async getEventFeedbackQuestions(
    request: GetEventFeedbackQuestionsRequest
  ): Promise<GetEventFeedbackQuestionsResponse> {
    return this.send({}, `form/${request._id}`, "get");
  }

  async submitEventFeedback(
    request: AnswerFormQuestionsRequest
  ): Promise<void> {
    return this.send(request, "form/answer", "post");
  }

  // image

  async uploadImage(request: UploadImageRequest): Promise<UploadImageResponse> {
    return this.send(request, "image", "post", true);
  }

  async updateProfilePicture(
    request: UploadImageRequest
  ): Promise<VolunteerData> {
    return this.send(request, "image/profile-picture", "post", true);
  }

  protected async send(
    request: any,
    path: string,
    method: HttpMethod,
    isImageUpload: boolean = false
  ) {
    const headers: Record<string, string> = {
      "Content-Type": isImageUpload
        ? "multipart/form-data"
        : "application/json",
    };

    if (process.env.NODE_ENV === "development") {
      headers["Access-Control-Allow-Origin"] = "*";
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: AxiosRequestConfig = { headers };

    switch (method) {
      case "get":
        return (await this.axiosInstance.get(path, config)).data;
      case "post":
        return (await this.axiosInstance.post(path, request, config)).data;
      case "put":
        return (await this.axiosInstance.put(path, request, config)).data;
      case "delete":
        return (await this.axiosInstance.delete(path, config)).data;
      default:
        return Promise.resolve(); // best way to handle this?
    }
  }
}

let urlBaseEndpoint;

switch (process.env.NEXT_PUBLIC_ENV) {
  case "development":
    urlBaseEndpoint = "http://localhost:5000";
    break;
  case "production":
    urlBaseEndpoint = "https://api-prod-dot-journey-288113.et.r.appspot.com/";
    break;
  default:
    urlBaseEndpoint = "https://api-dot-journey-288113.et.r.appspot.com/";
}

const sharedClient: AxiosApiClient = new AxiosApiClient(urlBaseEndpoint);
export default sharedClient;
