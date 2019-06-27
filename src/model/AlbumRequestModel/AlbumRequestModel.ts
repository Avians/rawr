export interface AlbumRequestModel {
    requestedBy: string;
    fulfilledBy: string;
    albumLink: string;
    imageLinks: string[];
    score: number;
}
