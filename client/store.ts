import { createStore, AnyAction } from 'redux';
import {
  MakeStore, createWrapper, Context, HYDRATE,
} from 'next-redux-wrapper';

const DEV = process.env.NODE_ENV === 'development';

// server and client state separation
export interface State {
  server: any;
  client: any;
}

const initialState = { server: {}, client: {} };

const rootReducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // sep client, server state in case getStaticProps, getServerSideProps cause state conflicts
      return {
        client: { ...state.client, ...action.payload.client },
        server: { ...state.server, ...action.payload.server },
      };
    case 'TICK':
      // TODO: test method, remove whenever
      console.log(action);
      return {
        client: { ...state.client, ...action.payload.client },
        server: { ...state.server, ...action.payload.server },
      };
    default:
      return state;
  }
};

// eslint-disable-next-line no-unused-vars
const makeStore: MakeStore = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper<State>(makeStore, DEV ? { debug: true } : {});
