export interface AlbumRequestModel {
    type: "album";

    requestedBy: string;
    fulfilledBy: string;
    albumLink: string;
    imageLinks: string[];
    score: number;
}
