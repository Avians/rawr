import { Action, Thunk, action, thunk } from "easy-peasy";

import { Filter } from "../model/Filter";
import { ImageRequestModel } from "../model/ImageRequestModel";
import { Reddit } from "../api/Reddit";
import { AsImageModels } from "../api/Conversions/RedditToImageModel";

export type IsSelected = { isSelected: boolean };

export interface ImageRequestResults {
    results: (ImageRequestModel & IsSelected)[];
    selectedResults: number[];
    toggleSelection: Action<ImageRequestResults, number>;

    addImageRequest: Action<ImageRequestResults, ImageRequestModel>;
    resetImages: Action<ImageRequestResults>;

    fetchRedditThread: Thunk<ImageRequestResults, string>;
}

export interface SearchModel {
    url: string;
    isLoading: boolean;
    updateSearchUrl: Action<SearchModel, string>;
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
        results: [],
        selectedResults: [],
        toggleSelection: action((state, index) => {
            state.results[index].isSelected = !state.results[index].isSelected;
        }),

        addImageRequest: action((state, imageRequest) => {
            state.results.push({ ...imageRequest, isSelected: false });
        }),
        resetImages: action(state => {
            state.results = [];
            state.selectedResults = [];
        }),

        fetchRedditThread: thunk(async (actions, redditUrl) => {
            const redditThread = await Reddit.getRedditThread(redditUrl);
            actions.resetImages();
            AsImageModels(redditThread)
                .forEach(comment => {
                    actions.addImageRequest(comment);
                });
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
            state.activeImageResultFilters.push(filter);
        }),
        removeImageResultFilter: action((state, filter) => {
            state.activeImageResultFilters = state.activeImageResultFilters.filter(
                oldFilter => oldFilter === filter,
            );
        }),
    },
};
