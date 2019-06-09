import axios from "axios";

export class ImgurProvider {
    constructor({ client_id }) {
        this.clientId = client_id;
        this.album = null;
    }

    static async createFromEnv() {
        return new ImgurProvider({
            client_id: process.env.REACT_APP_IMGUR_CLIENT_ID,
        });
    }

    async fetchAlbumImagesFromHash(hash) {
        const url = `https://api.imgur.com/3/album/${hash}/images`;
        const headers = {
            Authorization: `Client-ID ${this.clientId}`,
        };
        const response = await axios.get(url, { headers: headers });
        const images = response["data"]["data"];
        return images.map(image => image["link"]);
    }

    async createNewAlbum(title) {
        const url = "https://api.imgur.com/3/album";
        const payload = {
            "ids[]": "{{imageHash}}",
            title: title,
            description: "",
            cover: "{{imageHash}}",
        };
        const headers = {
            Authorization: `Client-ID ${this.clientId}`,
        };

        const response = await axios.post(url, payload, { headers: headers });
        this.album = response["data"]["data"];
    }

    async uploadImageToAlbum({ imageUrl, description }) {
        const url = "https://api.imgur.com/3/image";
        const payload = {
            image: imageUrl,
            type: "url",
            description: description,
            album: this.album["deletehash"],
        };
        const headers = {
            Authorization: `Client-ID ${this.clientId}`,
        };
        await axios.post(url, payload, { headers: headers });
    }

    albumUrl() {
        return `https://imgur.com/a/${this.album.id}`;
    }
}
