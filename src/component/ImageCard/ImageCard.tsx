import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LazyLoad from "react-lazyload";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import Typography from "@material-ui/core/Typography";

interface ImageCardProps {
    imageRequestModel: ImageRequestModel;
    isSelected?: boolean;
    onImageClick?: () => void;
    onSelectClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = props => {
    const { imageRequestModel, isSelected, onSelectClick, onImageClick } = props;
    return (
        <Card style={{
            minWidth: 300,
            maxWidth: 350,
        }} raised={isSelected}>
            <CardActionArea onClick={() => {
                if (onImageClick) onImageClick();
            }}>
                <CardMedia
                    style={{
                        height: 180,
                    }}
                    image={imageRequestModel.imageLink}
                    title={imageRequestModel.imageLink}
                />
            </CardActionArea>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Requested by</b>: {imageRequestModel.requestedBy}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Fulfilled by</b>: {imageRequestModel.fulfilledBy}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Score</b>: {imageRequestModel.score}
                </Typography>
            </CardContent>

            <CardActions onClick={() => {
                if (onSelectClick) onSelectClick();
            }}>
                <Typography variant="button" color="primary">
                    {isSelected ? "Selected" : "Select"}
                </Typography>
            </CardActions>
        </Card>
    );
};

export const ImageCardModal: React.FC<{
    imageLink: string;
    open: boolean;
    onClose: () => void;
}> = props => {
    const { imageLink, open, onClose } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [imageLink]);

    return (
        <Dialog open={open} onClose={onClose} scroll="body" maxWidth="xl" keepMounted={true}>
            <DialogTitle>Test</DialogTitle>
            <DialogContent>
                <LazyLoad>
                    <img
                        src={imageLink}
                        alt={imageLink}
                        style={{ width: "100%", height: "auto" }}
                    />
                </LazyLoad>
            </DialogContent>
        </Dialog>
    );
};
