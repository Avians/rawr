import { RedditThread, RedditComment } from "../../Reddit/Reddit";
import { ImageRequestModel } from "../../../model/ImageRequestModel";
import getUrls from "get-urls";

const filterFromDepth = (comment: RedditComment, currentDepth: number) => {
    let fulfilled: ImageRequestModel[] = [];
};

export const AsImageModels = (thread: RedditThread): ImageRequestModel[] => {
    let results: ImageRequestModel[] = [];
    for (const root of thread.rootComments) {
        console.log(getUrls(root.body));
    }

    return [];
};
