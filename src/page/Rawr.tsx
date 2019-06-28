import { Container, Grid, Typography } from "@material-ui/core";
import { useStoreActions, useStoreState } from "../redux/store";

import { AggregateFilter } from "../model/Filter";
import { ImageCard, ImageCardModal } from "../component/ImageCard";
import { ImageRequestModel } from "../model/ImageRequestModel";
import React, { useState } from "react";
import { SearchView } from "../views/SearchView";

const Rawr: React.FC = () => {
    const state = {
        images: useStoreState(state => state.imageRequestResults),
        filters: useStoreState(
            state => state.filterModel.activeImageResultFilters,
        ),
    };
    const actions = {
        toggleImageSelection: useStoreActions(
            actions => actions.imageRequestResults.toggleSelection,
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
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="center">
                <Grid item>
                    <br/>
                    <Typography variant="h4">RAWR</Typography>
                </Grid>

                <Grid item xs={12}>
                    <SearchView/>
                </Grid>

                {state.images.results
                    .filter(activeFilters())
                    .map((imageResult, index) => (
                        <Grid item key={imageResult.imageLink}>
                            <ImageCard
                                imageRequestModel={imageResult}
                                isSelected={imageResult.isSelected}
                                onSelectClick={() => {
                                    actions.toggleImageSelection(index);
                                }}
                                onImageClick={() => {
                                    setPreviewImage(imageResult.imageLink);
                                    setOpenModal(true);
                                }}
                            />
                        </Grid>
                    ))}
            </Grid>
            <ImageCardModal imageLink={previewImage} open={openModal} onClose={() => setOpenModal(false)}/>
        </Container>
    );
};

export default Rawr;
