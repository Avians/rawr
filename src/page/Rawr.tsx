import { Container, Grid, Typography } from "@material-ui/core";
import { useStoreActions, useStoreState } from "../redux/store";

import { ImageCard } from "../component/ImageCard";
import React from "react";
import { SearchBar } from "../component/SearchBar";

const Rawr: React.FC = () => {
    const searchState = useStoreState(state => state.searchModel);
    const search = useStoreActions(actions => actions.searchModel.search);

    const imageResultState = useStoreState(state => state.imageRequestResults);
    const imageToggleSelection = useStoreActions(
        actions => actions.imageRequestResults.toggleSelection
    );

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify="center">
                <Grid item>
                    <br />
                    <Typography variant="h4">RAWR</Typography>
                </Grid>

                <Grid item xs={12}>
                    <SearchBar
                        disabled={searchState.isLoading}
                        onSearchClicked={input => search(input)}
                    />
                </Grid>

                {imageResultState.results.map((imageResult, index) => {
                    return (
                        <Grid item key={index}>
                            <ImageCard
                                imageRequestModel={imageResult}
                                isSelected={imageResultState.selectedResults.includes(
                                    index
                                )}
                                onSelectClick={() => {
                                    imageToggleSelection(index);
                                }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Rawr;
