import { Action, Thunk, action, thunk } from "easy-peasy";

import { Filter } from "../model/Filter";
import { ImageRequestModel } from "../model/ImageRequestModel";
import { Reddit } from "../api/Reddit";

export interface ImageRequestResults {
    results: ImageRequestModel[];
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
            if (state.selectedResults.indexOf(index) === -1) {
                state.selectedResults = [...state.selectedResults, index];
            } else {
                state.selectedResults = state.selectedResults.filter(
                    i => i !== index,
                );
            }
        }),

        addImageRequest: action((state, imageRequest) => {
            state.results.push(imageRequest);
        }),
        resetImages: action(state => {
            state.results = [];
            state.selectedResults = [];
        }),

        fetchRedditThread: thunk(async (actions, redditUrl) => {
            const redditThread = await Reddit.getRedditThread(redditUrl);

            actions.resetImages();
            redditThread.rootComments.forEach(comment => {
                actions.addImageRequest({
                    requestedBy: comment.author,
                    fulfilledBy: comment.body,
                    score: comment.upVotes,
                    imageLink: comment.permaLink,
                });
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
