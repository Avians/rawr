import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LazyLoad from "react-lazyload";
import Typography from "@material-ui/core/Typography";

interface AlbumCardProps {
    albumLink: string;
    imageLinks: string[];
    isSelected?: boolean;
    onImageClick?: () => void;
    onSelectClick?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = props => {
    const { albumLink, imageLinks, isSelected, onSelectClick, onImageClick } = props;
    const [expanded, setExpanded] = useState(false);

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
                        image={imageLinks[0]}
                        title={imageLinks[0]}
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
                        {isSelected ? "Select All" : "Select"}
                    </Typography>

                </CardActions>
            </CardActionArea>
        </Card>
    );
};