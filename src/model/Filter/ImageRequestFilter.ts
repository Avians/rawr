import { ImageRequestModel } from "../ImageRequestModel";
import { Predicate, PredicateHoc } from "./Filter";

export interface ImageRequestFiltersType {
    ScoreGreaterThan: PredicateHoc
    ScoreLowerThan: PredicateHoc
}

export const ImageRequestFilters: ImageRequestFiltersType = {
    ScoreGreaterThan: (score: number): Predicate => {
        return (model: ImageRequestModel) => {
            return model.score >= score;
        };
    },

    ScoreLowerThan: (score: number): Predicate => {
        return (model: ImageRequestModel) => {
            return model.score <= score;
        };
    },
};
