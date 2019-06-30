import { Container, Grid, Typography } from "@material-ui/core";
import { useStoreActions, useStoreState } from "../redux/store";

import { AggregateFilter } from "../model/Filter";
import { ImageCard, ImageCardModal } from "../component/ImageCard";
import { ImageRequestModel } from "../model/ImageRequestModel";
import React, { Component, useState } from "react";
import { SearchView } from "../views/SearchView";
import { ImageGridView } from "../views/ImageGridView";

class Rawr extends Component {
    render() {


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

                    <Grid item xs={12}>
                        <ImageGridView/>
                    </Grid>
                </Grid>
                {/*<ImageCardModal imageLink={previewImage} open={openModal} onClose={() => setOpenModal(false)}/>*/}
            </Container>
        );
    }
}

export default Rawr;
