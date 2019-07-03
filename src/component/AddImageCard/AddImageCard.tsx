import React, { useState } from "react";
import { ImageRequestModel } from "../../model/ImageRequestModel";
import { createStyles, Grid, Theme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { ImageCard } from "../ImageCard";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2),
        },
    }),
);

export const AddImageCard: React.FC<{
    onAddClick?: (model: ImageRequestModel) => void;
}> = props => {
    const classes = useStyles();
    const { onAddClick } = props;

    const [image, setImage] = useState("");
    const [requestedBy, setRequestedBy] = useState("");
    const [fulfilledBy, setFulfilledBy] = useState("");

    const isValid = () => image.length > 0;

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Paper className={classes.root}>

                    <form noValidate autoCapitalize="off">
                        <TextField
                            label="Image Link"
                            placeholder="https://imgur.com/..."
                            helperText={"Field is required"}
                            required
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={e => setImage(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Requested by"
                            placeholder="User..."
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={e => setRequestedBy(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Fulfilled by"
                            placeholder="User..."
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={e => setFulfilledBy(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!isValid()}
                            onClick={() => {
                                if (onAddClick) onAddClick({
                                    type: "image",
                                    requestedBy,
                                    fulfilledBy,
                                    imageLink: image,
                                    score: 1,
                                });
                            }}>
                            Add
                        </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <div style={{ maxWidth: "350px", margin: "0 auto" }}>
                    <ImageCard imageLink={image}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>Requested by</b>: {requestedBy}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>Fulfilled by</b>: {fulfilledBy}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>Score</b>: 1
                        </Typography>
                    </ImageCard>
                </div>
            </Grid>
        </Grid>
    );
};