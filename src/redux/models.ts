import { Action, action } from "easy-peasy";

import { ImageRequestModel } from "../model/ImageRequestModel";

export interface ImageRequestResults {
    results: ImageRequestModel[];
    selectedResults: number[];
    toggleSelection: Action<ImageRequestResults, number>;
}

export interface SearchModel {
    url: string;
    isLoading: boolean;
    search: Action<SearchModel, string>;
}

export interface StoreModel {
    imageRequestResults: ImageRequestResults;
    searchModel: SearchModel;
}

export const storeModel: StoreModel = {
    imageRequestResults: {
        results: [
            {
                requestedBy: "Zain",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 1000,
            },
            {
                requestedBy: "Zain",
                fulfilledBy: "Matthijs",
                imageLink: "https://files.catbox.moe/14fvh7.png",
                score: 1000,
            },
        ],
        selectedResults: [0],
        toggleSelection: action((state, index) => {
            if (state.selectedResults.indexOf(index) === -1) {
                state.selectedResults = [...state.selectedResults, index];
            } else {
                state.selectedResults = state.selectedResults.filter(
                    i => i !== index
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
};
