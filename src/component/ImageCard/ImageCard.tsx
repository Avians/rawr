import { createStyles, makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
    createStyles({
        card: {
            minWidth: 300,
            maxWidth: 350,
        },
        media: {
            height: 140,
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

    return (
        <Card className={classes.card} raised={isSelected}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={imageRequestModel.imageLink}
                    title="Contemplative Reptile"
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
