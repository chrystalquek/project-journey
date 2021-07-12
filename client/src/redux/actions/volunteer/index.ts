import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@api/apiClient";
import { GetVolunteersPaginatedRequest } from "@api/request";
import { VolunteerCollate } from "@redux/reducers/volunteer/index";
import { Pagination } from "@utils/helpers/pagination";
import { StoreState } from "@redux/store";
import { GetVolunteersPaginatedResponse } from "@api/response";
import { convertFilterObjectToArray } from "@utils/helpers/filterObject";

// functions

// only need to define generics if need to use getState
// define generics for createAsyncThunk: return type, parameters and empty object: https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
export const getVolunteers = createAsyncThunk<
  GetVolunteersResponseParam,
  GetVolunteersParam,
  { state: StoreState }
>(
  "volunteer/getVolunteers",
  async (param: GetVolunteersParam, { getState }) => {
    const volunteer = getState().volunteer.index;
    const { collate, pagination } = volunteer; // grab state from store if does not exist in params
    const { newPagination, newCollate } = param;

    // construct the request
    const request: GetVolunteersPaginatedRequest = {
      pageNo: newPagination?.pageNo ?? pagination.pageNo,
      size: newPagination?.size ?? pagination.size,
      volunteerType: convertFilterObjectToArray(
        newCollate?.filters?.volunteerType ?? collate.filters.volunteerType
      ),
      name: newCollate?.search?.name ?? collate.search.name,
      sort: newCollate?.sort ?? collate.sort,
    };
    const response = await apiClient.getVolunteers(request);

    // combine the response and params into one object that can be accessed by reducer
    return { response, param };
  }
);

// other funcions...

// parameter types
type GetVolunteersParam = {
  newPagination?: Partial<Pagination>;
  newCollate?: Partial<VolunteerCollate>;
};

type GetVolunteersResponseParam = {
  response: GetVolunteersPaginatedResponse;
  param: GetVolunteersParam;
};
