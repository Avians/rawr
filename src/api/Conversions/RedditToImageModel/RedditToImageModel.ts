import { RedditThread, RedditComment } from "../../Reddit";
import { ImageRequestModel } from "../../../model/ImageRequestModel";
import { AlbumRequestModel } from "../../../model/AlbumRequestModel";
import getUrls from "get-urls";

export type ImageLink = {
    link: string;
    type: "direct" | "album";
}

const identifyUrlAsImage = (url: string): Array<ImageLink> => {
    const tokens = url
        .split(/[[\]()]/g) // Split Markdown URLs by '[]()' and remove them
        .filter(url => url.length !== 0) // Remove empty urls
        .filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates

    const directLinks = tokens
        .filter(url => ["jpg", "jpeg", "png"].some(extension => url.endsWith(extension))) // Check for valid extension
        .map(token => {
                const link: ImageLink = {
                    link: token,
                    type: "direct",
                };

                return link;
            },
        );

    const imgurAlbums = tokens
        .filter(url => url.match(/https:\/\/(?:www\.)?imgur\.com\/(?:a|gallery)\/([\w]+)\/?/g))
        .map(token => {
                const link: ImageLink = {
                    link: token,
                    type: "album",
                };

                return link;
            },
        );

    return [...directLinks, ...imgurAlbums];
};

const recursiveFindImagesByDepth = (comment: RedditComment, currentDepth: number): Array<ImageRequestModel | AlbumRequestModel> => {
    let fulfilled: Array<ImageRequestModel | AlbumRequestModel> = [];

    const addImage = (comment: RedditComment, image: ImageLink) => {
        if (image.type === "direct") {
            fulfilled.push({
                type: "image",

                fulfilledBy: comment.author,
                requestedBy: "",
                imageLink: image.link,
                score: comment.upVotes,
            });
        } else {

        }
    };

    if (currentDepth >= 1) {
        [...Array.from(getUrls(comment.body))]
            .flatMap(url => identifyUrlAsImage(url))
            .forEach(image => addImage(comment, image));
    }
    comment.replies
        .forEach(reply => fulfilled = [...fulfilled, ...recursiveFindImagesByDepth(reply, currentDepth + 1)]);

    return fulfilled;
};

export const AsImageModels = (thread: RedditThread): Array<ImageRequestModel | AlbumRequestModel> => {
    let results: Array<ImageRequestModel | AlbumRequestModel> = [];

    for (const root of thread.rootComments) {
        recursiveFindImagesByDepth(root, 1)
            .forEach(result =>
                results.push({
                    ...result,
                    requestedBy: root.author,
                }));
    }

    return results;
};
