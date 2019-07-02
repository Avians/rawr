import axios from "axios";

export class Imgur {
    private album: any;

    constructor(private clientId: string) {
        this.album = null;
    }

    static fromEnv(): Imgur {
        return new Imgur(process.env.REACT_APP_IMGUR_CLIENT_ID as string);
    }

    async fetchAlbumImages(albumHash: string): Promise<Array<string>> {
        const url = `https://api.imgur.com/3/album/${albumHash}/images`;
        const headers = {
            Authorization: `Client-ID ${this.clientId}`,
        };
        const response = await axios.get(url, { headers: headers });
        const images: any[] = response["data"]["data"];
        return images.map(image => image["link"]);
    }

    async createNewAlbum(title: string): Promise<void> {
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

    async uploadImageToAlbum(imageUrl: string, description: string): Promise<void> {
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

    albumUrl(): string {
        return `https://imgur.com/a/${this.album.id}`;
    }
}