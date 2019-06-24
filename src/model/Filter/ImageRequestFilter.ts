import {Filter} from './Filter';
import {ImageRequestModel} from '../ImageRequestModel';

export interface ImageRequestFilter extends Filter<ImageRequestModel> {
  predicate(model: ImageRequestModel): boolean;
}
