import {ImageRequestModel} from '../ImageRequestModel';

export interface AlbumRequestModel {
  requestedBy: string;
  fulfilledBy: string;
  albumLink: string;
  imageLinks: string[];
}
