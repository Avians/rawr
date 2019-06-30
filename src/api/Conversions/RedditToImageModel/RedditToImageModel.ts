import { RedditThread, RedditComment } from "../../Reddit";
import { ImageRequestModel } from "../../../model/ImageRequestModel";
import getUrls from "get-urls";

export type ImageLink = {
    link: string;
    type: "directLink" | "imgurAlbum";
}

const sanitizeUrlAsImage = (url: string): Array<ImageLink> => {
    const tokens = url
        .split(/[[\]()]/g) // Split Markdown URLs by '[]()' and remove them
        .filter(url => url.length !== 0) // Remove empty urls
        .filter(url => ["jpg", "jpeg", "png"].some(extension => url.endsWith(extension))) // Check for valid extension
        .filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates

    return tokens.map(token => {
            const link: ImageLink = {
                link: token,
                type: "directLink",
            };

            return link;
        },
    );
};

const filterFromDepth = (comment: RedditComment, currentDepth: number): Array<ImageRequestModel> => {
    let fulfilled: ImageRequestModel[] = [];

    const addImage = (comment: RedditComment, image: ImageLink) => {
        fulfilled.push({
            fulfilledBy: comment.author,
            requestedBy: "",
            imageLink: image.link,
            score: comment.upVotes,
        });
    };

    if (currentDepth >= 1) {
        [...Array.from(getUrls(comment.body))]
            .flatMap(url => sanitizeUrlAsImage(url))
            .forEach(image => addImage(comment, image));
    }
    comment.replies
        .forEach(reply => fulfilled = [...fulfilled, ...filterFromDepth(reply, currentDepth + 1)]);

    return fulfilled;
};

export const AsImageModels = (thread: RedditThread): Array<ImageRequestModel> => {
    let results: ImageRequestModel[] = [];

    for (const root of thread.rootComments) {
        filterFromDepth(root, 1)
            .forEach(result => results.push({
                ...result,
                requestedBy: root.author,
            }));
    }

    return results;
};
