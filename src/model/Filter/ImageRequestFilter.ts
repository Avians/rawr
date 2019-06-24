import {ImageRequestModel} from '../ImageRequestModel';

export const ImageRequestFilters = {
  ScoreGreaterThan: (score: number) => {
    return (model: ImageRequestModel) => {
      return model.score >= score;
    }
  },

  ScoreLowerThan: (score: number) => {
    return (model: ImageRequestModel) => {
      return model.score <= score;
    }
  }
}
