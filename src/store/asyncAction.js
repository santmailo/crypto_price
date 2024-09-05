import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "./actions";

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (err) {
      dispatch(fetchDataFailure(err.message));
    }
  };
};
