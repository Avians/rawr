import { ImageRequestModel } from "../ImageRequestModel";
import { Predicate, PredicateHoc } from "./Filter";

export interface ImageRequestFiltersType {
    ScoreGreaterThan: PredicateHoc<ImageRequestModel>;
    ScoreLowerThan: PredicateHoc<ImageRequestModel>;
}

export const ImageRequestFilters: ImageRequestFiltersType = {
    ScoreGreaterThan: (score: number): Predicate<ImageRequestModel> =>
        (model: ImageRequestModel) => {
            return model.score >= score;
        },

    ScoreLowerThan: (score: number): Predicate<ImageRequestModel> =>
        (model: ImageRequestModel) => {
            return model.score <= score;
        },
};
