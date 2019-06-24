import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
    createStyles({
        card: {
            minWidth: 300,
            maxWidth: 350,
        },
        media: {
            height: 180,
        },
        selectArea: {
            justifyContent: "center",
        },
    })
);

interface ImageCardProps {
    imageRequestModel: ImageRequestModel;
    isSelected?: boolean;
    onSelectClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = props => {
    const classes = useStyles();
    const { imageRequestModel, isSelected, onSelectClick } = props;

    const [openModal, setOpenModal] = useState(false);

    return (
        <Card className={classes.card} raised={isSelected}>
            <ImageCardModal
                imageLink={imageRequestModel.imageLink}
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <CardActionArea onClick={() => setOpenModal(true)}>
                <CardMedia
                    className={classes.media}
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

            <CardActionArea
                onClick={() => {
                    if (onSelectClick) onSelectClick();
                }}
            >
                <CardActions className={classes.selectArea}>
                    <Typography variant="button" color="primary">
                        {isSelected ? "Selected" : "Select"}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

const ImageCardModal: React.FC<{
    imageLink: string;
    open: boolean;
    onClose: () => void;
}> = props => {
    const { imageLink, open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose} scroll="body" maxWidth="xl">
            <DialogTitle>Test</DialogTitle>
            <DialogContent>
                <img
                    src={imageLink}
                    alt={imageLink}
                    style={{ width: "100%", height: "auto" }}
                />
            </DialogContent>
        </Dialog>
    );
};
