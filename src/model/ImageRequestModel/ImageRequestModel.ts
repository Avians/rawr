export interface ImageRequestModel {
    type: "image";

    requestedBy: string;
    fulfilledBy: string;
    imageLink: string;
    score: number;
}
