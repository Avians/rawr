import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(
    createStyles({
        root: {
            padding: "2px 4px",
            display: "flex",
            flexGrow: 1,
        },
        input: {
            marginLeft: 8,
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    }),
);

interface SearchBarProps {
    onValueChanged: (input: string) => void;
    onSearchClicked: () => void;
    disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = props => {
    const [textInput, setTextInput] = useState("");

    const classes = useStyles();
    const { onValueChanged, onSearchClicked, disabled } = props;

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Enter Reddit Thread"
                inputProps={{ "aria-label": "Enter Reddit Thread" }}
                value={textInput}
                onChange={e => {
                    setTextInput(e.target.value);
                    onValueChanged(e.target.value);
                }}
                onKeyPress={e => {
                    e.key === "Enter" && onSearchClicked();
                }}
                disabled={disabled}
            />

            <IconButton
                className={classes.iconButton}
                aria-label="Search"
                onClick={() => onSearchClicked()}
                disabled={disabled}
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};
