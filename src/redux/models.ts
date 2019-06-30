import { Action, Thunk, action, thunk } from "easy-peasy";

import { AsImageModels } from "../api/Conversions/RedditToImageModel";
import { Filter } from "../model/Filter";
import { ImageRequestModel } from "../model/ImageRequestModel";
import { Reddit } from "../api/Reddit";

export type IsSelected = {
    isSelected: boolean
};

export interface ImageRequestResults {
    results: Array<(ImageRequestModel & IsSelected)>;
    selectedResults: Array<number>;
    toggleSelection: Action<ImageRequestResults, number>;

    addImageRequest: Action<ImageRequestResults, ImageRequestModel>;
    addImageRequests: Action<ImageRequestResults, Array<ImageRequestModel>>;
    resetImages: Action<ImageRequestResults>;

    fetchRedditThread: Thunk<ImageRequestResults, string>;
}

export interface SearchModel {
    url: string;
    isLoading: boolean;
    updateSearchUrl: Action<SearchModel, string>;
}

export interface FilterModel {
    activeImageResultFilters: Array<Filter<ImageRequestModel>>;
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
        results: [],
        selectedResults: [],
        toggleSelection: action((state, index) => {
            state.results[index].isSelected = !state.results[index].isSelected;
        }),

        addImageRequest: action((state, imageRequest) => {
            state.results = [...state.results, { ...imageRequest, isSelected: false }];
        }),
        addImageRequests: action((state, imageRequests) => {
            state.results = [
                ...state.results, ...imageRequests.map(imageRequest => {
                    return {
                        ...imageRequest, isSelected: false,
                    };
                }),
            ];
        }),
        resetImages: action(state => {
            state.results = [];
            state.selectedResults = [];
        }),

        fetchRedditThread: thunk(async (actions, redditUrl) => {
            actions.resetImages();

            const thread = await Reddit.getRedditThread(redditUrl);
            actions.addImageRequests(AsImageModels(thread));
        }),
    },
    searchModel: {
        url: "",
        isLoading: false,
        updateSearchUrl: action((state, url) => {
            state.url = url;
        }),
    },
    filterModel: {
        activeImageResultFilters: [],
        addImageResultFilter: action((state, filter) => {
            state.activeImageResultFilters = [...state.activeImageResultFilters, filter];

        }),
        removeImageResultFilter: action((state, filter) => {

            state.activeImageResultFilters = state.activeImageResultFilters.filter(
                // cant use == or ===
                oldFilter => oldFilter.toString() !== filter.toString(),
            );
        }),
    },
};
