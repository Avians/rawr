import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LazyLoad from "react-lazyload";
import Typography from "@material-ui/core/Typography";
import { ImageCard } from "../ImageCard";
import { Grid } from "@material-ui/core";

interface AlbumCardProps {
    albumLink: string;
    imageLinks: string[];
    isSelected: (image: string) => boolean;
    onSelectClick?: (image: string) => void;
    onImageClick?: (image?: string) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = props => {
    const { albumLink, imageLinks, isSelected, onImageClick, onSelectClick } = props;
    const [expanded, setExpanded] = useState(false);

    return (
        <Card style={{
            minWidth: 300,
            width: expanded ? "1280px" : "",
        }}>
            {!expanded ?
                <>
                    <CardActionArea onClick={() => {
                        if (onImageClick) onImageClick();
                    }}>
                        <LazyLoad once>
                            <CardMedia
                                style={{
                                    height: 180,
                                }}
                                image={imageLinks[0]}
                                title={imageLinks[0]}
                            />
                        </LazyLoad>

                    </CardActionArea>
                </> :
                <>
                    <Grid container spacing={1} justify="space-evenly" style={{ padding: "10px" }}>
                        {imageLinks.map(image => {
                            return (
                                <Grid item key={image}>
                                    <ImageCard
                                        imageLink={image}
                                        onSelectClick={() => {
                                            if (onSelectClick) onSelectClick(image);
                                        }}
                                        isSelected={isSelected ? isSelected(image) : false}
                                        onImageClick={() => onImageClick ? onImageClick(image) : null}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>}

            <CardContent>
                {props.children}
            </CardContent>

            <CardActionArea
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                <CardActions style={{ justifyContent: "center" }}>
                    <Typography variant="button" color="primary">
                        {expanded ? "Hide Images" : "Show Images"}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};