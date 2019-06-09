import { ImgurProvider } from "../providers/imgur/imgur";
import _ from "lodash";

export class CommentFilter {
    /**
     * options:
     *    minDepth: 1
     *    validExtensions: ["jpeg", "jpg", "png"]
     *    minAlbumSize: 0
     *    maxAlbumSize: 5
     */
    constructor(options) {
        const defaults = {
            minDepth: 1,
            validExtensions: ["jpeg", "jpg", "png"],
            minAlbumSize: 0,
            maxAlbumSize: 5,
        };

        this.options = _.defaults(options, defaults);
    }

    static __matchForImage(body) {
        const regex = /https?:\/\/[^\s]+/gi;
        const matches = body.match(regex);
        return matches != null ? matches : [];
    }

    static __matchForImgurAlbums(body) {
        const regex = /https:\/\/(?:www\.)?imgur\.com\/(?:a|gallery)\/([\w]+)\/?/g;
        const matches = [...body.matchAll(regex)];
        return matches.map(match => match[1]);
    }

    static __cleanUrl(url) {
        const isLetter = str => {
            return str.length === 1 && str.match(/[a-z]/i);
        };

        while (!isLetter(url.slice(-1))) {
            url = url.slice(0, -1);
        }

        return url;
    }

    __isValidImage(url) {
        return _.some(this.options.validExtensions, ext => url.endsWith(ext));
    }

    __isValidAlbum(album) {
        const { minAlbumSize, maxAlbumSize } = this.options;
        return album.length >= minAlbumSize && album.length <= maxAlbumSize;
    }

    async __filterDepth(comment, curDepth) {
        let fulfilled = [];

        const addImage = (comment, image) => {
            fulfilled.push({
                fulfilled_by: comment.author.name,
                image: image,
                score: comment.score,
            });
        };

        const checkBodyAndAddImage = async comment => {
            CommentFilter.__matchForImage(comment.body)
                .map(url => CommentFilter.__cleanUrl(url))
                .filter(url => this.__isValidImage(url))
                .forEach(image => addImage(comment, image));

            const albums = CommentFilter.__matchForImgurAlbums(comment.body);
            const imgurClient = await ImgurProvider.createFromEnv();
            for (const album of albums) {
                const images = await imgurClient.fetchAlbumImagesFromHash(
                    album
                );

                if (!this.__isValidAlbum(images)) continue;
                images.forEach(image => {
                    addImage(comment, image);
                });
            }
        };

        if (curDepth >= this.options.minDepth) {
            await checkBodyAndAddImage(comment);
        }

        for (const reply of comment.replies) {
            fulfilled = [
                ...fulfilled,
                ...(await this.__filterDepth(reply, curDepth + 1)),
            ];
        }

        return fulfilled;
    }

    async filterForImages(comments) {
        let results = [];
        for (const comment of comments) {
            const commissions = await this.__filterDepth(comment, 0);
            if (!commissions || commissions.length === 0) {
                continue;
            }

            commissions.forEach(commission => {
                results.push({
                    requested_by: comment.author.name,
                    ...commission,
                });
            });
        }
        return results;
    }
}
