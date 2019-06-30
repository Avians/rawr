import { useStoreActions, useStoreState } from "../../redux/store";

import { ImageRequestFilters, PredicateHoc } from "../../model/Filter";
import { NumberFilter } from "../../component/Filter";
import React from "react";
import { SearchBar } from "../../component/SearchBar";
import { ImageRequestModel } from "../../model/ImageRequestModel";


export const SearchView: React.FC = () => {
    const state = {
        search: useStoreState(store => store.searchModel),
    };
    const actions = {
        search: useStoreActions(actions => actions.searchModel.updateSearchUrl),
        addFilter: useStoreActions(actions => actions.filterModel.addImageResultFilter),
        removeFilter: useStoreActions(actions => actions.filterModel.removeImageResultFilter),
        fetchResults: useStoreActions(actions => actions.imageRequestResults.fetchRedditThread),
    };

    const updateFilter = (prev: string, cur: string, predicate: PredicateHoc<ImageRequestModel>) => {
        const [prevVal, curVal] = [Number(prev), Number(cur)];

        // Filter has been emptied out, aka do not use a filter
        if (cur.length === 0) {
            actions.removeFilter(predicate(prevVal));
            return;
        }

        actions.removeFilter(predicate(prevVal));
        actions.addFilter(predicate(curVal));
    };

    return (
        <>
            <SearchBar
                disabled={state.search.isLoading}
                onValueChanged={(input) => actions.search(input)}
                onSearchClicked={() => {
                    actions.fetchResults(state.search.url);
                }}
            />
            <NumberFilter
                label={"Score greater than"}
                onValueChanged={(prev, cur) => {
                    updateFilter(prev, cur, ImageRequestFilters.ScoreGreaterThan);
                }}
            />
            <NumberFilter
                label={"Score lower than"}
                onValueChanged={(prev, cur) => {
                    updateFilter(prev, cur, ImageRequestFilters.ScoreLowerThan);
                }}
            />
        </>
    );
};
