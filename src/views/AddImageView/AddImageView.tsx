import React, { useState } from "react";
import { createStyles, Fab, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import { AddImageCard } from "../../component/AddImageCard";
import { useStoreActions } from "../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: "fixed",
            bottom: theme.spacing(5),
            right: "20%",
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

export const AddImageView: React.FC = () => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const actions = {
        addImage: useStoreActions(actions => actions.imageRequestResults.addImageRequest),
    };

    return (
        <>
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => setOpenModal(true)}>
                <AddIcon/>
            </Fab>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AddImageCard onAddClick={imageModel => {
                    actions.addImage(imageModel);
                    setOpenModal(false);
                }}/>
            </Modal>
        </>
    );
};
