import React, { useState } from "react";
import { ImageCard } from "../../component/ImageCard";
import { useStoreActions, useStoreState } from "../../redux/store";
import { AggregateFilter } from "../../model/Filter";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import { Grid } from "@material-ui/core";

export const ImageGridView: React.FC = () => {
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
        <Grid container spacing={3} justify={"space-evenly"}>
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

    );

};
