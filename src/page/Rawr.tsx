import { Container, Grid, Typography } from "@material-ui/core";
import { useStoreActions, useStoreState } from "../redux/store";

import { AggregateFilter } from "../model/Filter";
import { ImageCard } from "../component/ImageCard";
import { ImageRequestModel } from "../model/ImageRequestModel";
import React from "react";
import { SearchView } from "../views/SearchView";

const Rawr: React.FC = () => {
    const state = {
        images: useStoreState(state => state.imageRequestResults),
        filters: useStoreState(
            state => state.filterModel.activeImageResultFilters
        ),
    };
    const actions = {
        toggleImageSelection: useStoreActions(
            actions => actions.imageRequestResults.toggleSelection
        ),
    };

    const filter = () => {
        return AggregateFilter<ImageRequestModel>(
            ...state.filters.map(filter => filter.predicate)
        );
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="center">
                <Grid item>
                    <br />
                    <Typography variant="h4">RAWR</Typography>
                </Grid>

                <Grid item xs={12}>
                    <SearchView />
                </Grid>

                {state.images.results
                    .filter(filter().predicate)
                    .map((imageResult, index) => (
                        <Grid item key={index}>
                            <ImageCard
                                imageRequestModel={imageResult}
                                isSelected={state.images.selectedResults.includes(
                                    index
                                )}
                                onSelectClick={() => {
                                    actions.toggleImageSelection(index);
                                }}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default Rawr;
