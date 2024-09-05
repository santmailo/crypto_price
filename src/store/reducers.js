import { data } from "autoprefixer";
import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_REQUEST,
} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: "",
  filteredData: data,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
