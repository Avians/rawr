import { Action, action } from "easy-peasy";

import { Filter } from "../model/Filter";
import { ImageRequestModel } from "../model/ImageRequestModel";

export interface ImageRequestResults {
    results: ImageRequestModel[];
    selectedResults: number[];
    addImageRequest: Action<ImageRequestResults, ImageRequestModel>;
    toggleSelection: Action<ImageRequestResults, number>;
}

export interface SearchModel {
    url: string;
    isLoading: boolean;
    search: Action<SearchModel, string>;
}

export interface FilterModel {
    activeImageResultFilters: Filter<ImageRequestModel>[];
    addImageResultFilter: Action<FilterModel, Filter<ImageRequestModel>>;
    removeImageResultFilter: Action<FilterModel, Filter<ImageRequestModel>>;
}

export interface StoreModel {
    imageRequestResults: ImageRequestResults;
    searchModel: SearchModel;
    filterModel: FilterModel;
}

export const storeModel: StoreModel = {
    imageRequestResults: {
        results: [
            {
                requestedBy: "Zain5",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 5,
            },
            {
                requestedBy: "Zain1000",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 1000,
            },
            {
                requestedBy: "Zain100",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 100,
            },
            {
                requestedBy: "Zain300",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 300,
            },
        ],
        selectedResults: [0],
        addImageRequest: action((state, imageRequest) => {
            state.results.push(imageRequest);
        }),
        toggleSelection: action((state, index) => {
            if (state.selectedResults.indexOf(index) === -1) {
                state.selectedResults = [...state.selectedResults, index];
            } else {
                state.selectedResults = state.selectedResults.filter(
                    i => i !== index,
                );
            }
        }),
    },
    searchModel: {
        url: "",
        isLoading: false,
        search: action((state, url) => {
            state.url = url;
        }),
    },
    filterModel: {
        activeImageResultFilters: [],
        addImageResultFilter: action((state, filter) => {
            state.activeImageResultFilters.push(filter);
        }),
        removeImageResultFilter: action((state, filter) => {
            state.activeImageResultFilters = state.activeImageResultFilters.filter(
                oldFilter => oldFilter === filter,
            );
        }),
    },
};
