import { DataActions } from './data.actions';
import { dataInitialState } from './models/appData.initialState';
import { DataState } from './models/appData.state';

// eslint-disable-next-line default-param-last
const dataReducer = (state: DataState = dataInitialState, action: any) => {
  switch (action.type) {
    case DataActions.setMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: action.payload.mostPopularViewedArticles,
        mostPopularViewedArticlesRequestedPage: action.payload.mostPopularViewedArticlesRequestedPage,
      };
    case DataActions.unsetMostPopularViewedArticles:
      return {
        ...state,
        mostPopularViewedArticles: undefined,
        mostPopularViewedArticlesRequestedPage: undefined,
      };
    default:
      return state;
  }
};

export { dataReducer };
