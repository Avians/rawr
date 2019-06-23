import { Container, Grid } from "@material-ui/core";
import { useStoreActions, useStoreState } from "../redux/store";

import React from "react";
import { SearchBar } from "../component/SearchBar";

const Rawr: React.FC = () => {
    const searchState = useStoreState(state => state.searchModel);
    const search = useStoreActions(actions => actions.searchModel.search);

    return (
        <Container maxWidth="md">
            <Grid container justify="center">
                <SearchBar
                    disabled={searchState.isLoading}
                    onSearchClicked={input => search(input)}
                />
            </Grid>
        </Container>
    );
};

export default Rawr;
