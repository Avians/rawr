import {ImageRequestModel} from '../model/ImageRequestModel';

export interface ImageRequestResults {
  results: ImageRequestModel[];
}

const imageRequestResults: ImageRequestResults = {
  results: []
};

export interface StoreModel {
  imageRequestResults: ImageRequestResults;
}

export const storeModel: StoreModel = {imageRequestResults};