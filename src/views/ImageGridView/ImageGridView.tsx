import React, { useState } from "react";
import { ImageCard, ImageCardModal } from "../../component/ImageCard";
import { useStoreActions, useStoreState } from "../../redux/store";
import { AggregateFilter } from "../../model/Filter";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const ImageGridView: React.FC = () => {
    const state = {
        images: useStoreState(state => state.imageRequestResults),
        filters: useStoreState(
            state => state.filterModel.activeImageResultFilters,
        ),
    };
    const actions = {
        toggleImageSelection: useStoreActions(
            actions => actions.imageRequestResults.toggleImageSelection,
        ),
    };

    const activeFilters = () => {
        return AggregateFilter<ImageRequestModel>(
            ...state.filters,
        );
    };

    const [openModal, setOpenModal] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    return (
        <Grid container spacing={3} justify={"space-evenly"}>
            <ImageCardModal imageLink={previewImage} open={openModal} onClose={() => setOpenModal(false)}/>

            {state.images.imageResults
                .filter(activeFilters())
                .map((imageResult, index) => (
                    <Grid item key={imageResult.imageLink}>
                        <ImageCard
                            imageLink={imageResult.imageLink}
                            isSelected={imageResult.isSelected}
                            onSelectClick={() => {
                                actions.toggleImageSelection(index);
                            }}
                            onImageClick={() => {
                                setPreviewImage(imageResult.imageLink);
                                setOpenModal(true);
                            }}
                        >
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Requested by</b>: {imageResult.requestedBy}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Fulfilled by</b>: {imageResult.fulfilledBy}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Score</b>: {imageResult.score}
                            </Typography>
                        </ImageCard>
                    </Grid>
                ))}
        </Grid>

    );

};
