import { Container, Grid } from "@material-ui/core";

import React from "react";
import { SearchBar } from "../component/SearchBar";

const Rawr: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Grid container justify="center">
                <SearchBar
                    disabled
                    onSearchClicked={input => console.log(input)}
                />
            </Grid>
        </Container>
    );
};

export default Rawr;
