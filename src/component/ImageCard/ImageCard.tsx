import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LazyLoad from "react-lazyload";
import Typography from "@material-ui/core/Typography";

interface ImageCardProps {
    imageLink: string;
    isSelected?: boolean;
    onImageClick?: () => void;
    onSelectClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = props => {
    const { imageLink, isSelected, onSelectClick, onImageClick } = props;

    return (
        <Card style={{
            minWidth: 300,
            width: isSelected ? "100%" : "100%",
        }} raised={isSelected}>
            <CardActionArea onClick={() => {
                if (onImageClick) onImageClick();
            }}>
                <LazyLoad once>
                    <CardMedia
                        style={{
                            height: 180,
                        }}
                        image={imageLink}
                        title={imageLink}
                    />
                </LazyLoad>

            </CardActionArea>

            <CardContent>
                {props.children}
            </CardContent>

            <CardActionArea
                onClick={() => {
                    if (onSelectClick) onSelectClick();
                }}
            >
                <CardActions style={{ justifyContent: "center" }}>
                    <Typography variant="button" color="primary">
                        {isSelected ? "Selected" : "Select"}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export const ImageCardModal: React.FC<{
    imageLink: string;
    open: boolean;
    onClose: () => void;
}> = props => {
    const { imageLink, open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose} scroll="body" maxWidth="xl" keepMounted={true}>
            <DialogTitle>{imageLink}</DialogTitle>
            <DialogContent>
                <LazyLoad>
                    <img
                        src={imageLink}
                        alt={imageLink}
                        style={{
                            // keep image inside browser window
                            // without having to scroll
                            maxWidth: window.innerWidth * 0.8,
                            maxHeight: window.innerHeight * 0.8,
                        }}
                    />
                </LazyLoad>
            </DialogContent>
        </Dialog>
    );
};
