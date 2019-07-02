import { Action, Thunk, action, thunk } from "easy-peasy";

import { AsImageModels } from "../api/Conversions/RedditToImageModel";
import { Filter } from "../model/Filter";
import { ImageRequestModel } from "../model/ImageRequestModel";
import { Reddit } from "../api/Reddit";
import { AlbumRequestModel } from "../model/AlbumRequestModel";
import { Imgur } from "../api/Imgur";

type Selectable = {
    isSelected: boolean
};

type Image = (ImageRequestModel & Selectable);
type Album = (AlbumRequestModel & { selectedLinks: Map<string, Selectable> });

export interface ImageRequestResults {
    imageResults: Array<Image>;
    toggleImageSelection: Action<ImageRequestResults, number>;

    albumResults: Array<Album>;
    toggleAlbumSelection: Action<ImageRequestResults, [number, string]>;

    addImageRequest: Action<ImageRequestResults, ImageRequestModel>;
    addImageRequests: Action<ImageRequestResults, Array<ImageRequestModel>>;

    addAlbumRequest: Action<ImageRequestResults, AlbumRequestModel>;
    addAlbumRequests: Action<ImageRequestResults, Array<AlbumRequestModel>>;

    resetImages: Action<ImageRequestResults>;
    resetAlbums: Action<ImageRequestResults>;
    resetAll: Action<ImageRequestResults>;

    fetchRedditThread: Thunk<ImageRequestResults, string>;
    loadAlbumLinks: Thunk<ImageRequestResults, Array<AlbumRequestModel>>;
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
    imgur: Imgur;
    imageRequestResults: ImageRequestResults;
    searchModel: SearchModel;
    filterModel: FilterModel;
}

export const storeModel: StoreModel = {
    imgur: Imgur.fromEnv(),

    imageRequestResults: {
        imageResults: [],
        toggleImageSelection: action((state, index) => {
            state.imageResults[index].isSelected = !state.imageResults[index].isSelected;
        }),

        albumResults: [],
        toggleAlbumSelection: action((state, [index, link]) => {
            state.albumResults[index].selectedLinks.set(link, {
                isSelected: !state.albumResults[index].selectedLinks.get(link),
            });
        }),


        addImageRequest: action((state, imageRequest) => {
            state.imageResults = [...state.imageResults, { ...imageRequest, isSelected: false, type: "image" }];
        }),
        addImageRequests: action((state, imageRequests) => {
            state.imageResults = [
                ...state.imageResults, ...imageRequests.map((imageRequest): Image => {
                    return {
                        ...imageRequest, isSelected: false, type: "image",
                    };
                }),
            ];
        }),

        addAlbumRequest: action((state, albumRequest) => {
            state.albumResults = [...state.albumResults, {
                ...albumRequest,
                type: "album",
                selectedLinks: new Map<string, Selectable>(),
            }];
        }),
        addAlbumRequests: action((state, albumRequests) => {
            state.albumResults = [
                ...state.albumResults, ...albumRequests.map((albumRequest): Album => {
                    return {
                        ...albumRequest,
                        type: "album",
                        selectedLinks: new Map<string, Selectable>(),
                    };
                }),
            ];
        }),

        resetImages: action(state => {
            state.imageResults = [];
        }),
        resetAlbums: action(state => {
            state.albumResults = [];
        }),
        resetAll: action(state => {
            state.imageResults = [];
            state.albumResults = [];
        }),

        fetchRedditThread: thunk(async (actions, redditUrl) => {
            actions.resetAll();

            const thread = await Reddit.getRedditThread(redditUrl);

            let albums: Array<AlbumRequestModel> = [];
            AsImageModels(thread).forEach(model => {
                switch (model.type) {
                    case "image":
                        actions.addImageRequest(model);
                        break;
                    case "album":
                        albums.push(model);
                        break;
                }
            });

            actions.loadAlbumLinks(albums);
        }),
        loadAlbumLinks: thunk(async (actions, albums) => {
            const imgur = Imgur.fromEnv();

            albums.forEach(album => {
                imgur.fetchAlbumImages(album.albumLink).then(links => {
                    if (links.length === 1) {
                        // some stupid idiot made an album with only 1 image...
                        // just parse it as a normal imagerequest
                        actions.addImageRequest({
                            type: "image",
                            requestedBy: album.requestedBy,
                            fulfilledBy: album.fulfilledBy,
                            score: album.score,
                            imageLink: links[0],
                        });
                    } else {
                        const resolvedAlbum: AlbumRequestModel = {
                            ...album,
                            imageLinks: links,
                        };
                        actions.addAlbumRequest(resolvedAlbum);
                    }
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
