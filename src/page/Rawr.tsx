import { Container, Grid, Typography } from "@material-ui/core";

import React, { Component } from "react";
import { SearchView } from "../views/SearchView";
import { ImageGridView } from "../views/ImageGridView";
import { AddImageView } from "../views/AddImageView";

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

                    <Grid item xs={12}>
                        <AddImageView/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Rawr;
