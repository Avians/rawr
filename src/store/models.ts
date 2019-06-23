import {Action, action} from 'easy-peasy';

import {ImageRequestModel} from '../model/ImageRequestModel';

export interface ImageRequestResults {
  results: ImageRequestModel[];
}

export interface SearchModel {
  url: string;
  isLoading: boolean;
  search: Action<SearchModel, string>;
}

export interface StoreModel {
  imageRequestResults: ImageRequestResults;
  searchModel: SearchModel;
}

export const storeModel: StoreModel = {
  imageRequestResults: {results: []},
  searchModel: {
    url: '',
    isLoading: false,
    search: action((state, url) => {
      state.url = url;
    })
  }
};