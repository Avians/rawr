import React from "react";
import { Card, List, Button, Modal, Image } from "semantic-ui-react";

// TODO: Extract to CSS, probably.
const imgContainerStyle = {
    height: "179px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#123",
    backgroundSize: "cover",
    backgroundPosition: "50% 40%",
    backgroundRepeat: "no-repeat",
    border: "none",
};

const ImageModal = ({ imageUrl }) => (
    <Modal
        trigger={<ImageContainer imageUrl={imageUrl} />}
        basic
        closeIcon
        size="large"
    >
        <Modal.Header>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                {imageUrl}
            </a>
        </Modal.Header>
        <Modal.Content>
            <Image src={imageUrl} />
        </Modal.Content>
    </Modal>
);

const ImageContainer = props => {
    const { imageUrl, ...restProps } = props;
    return (
        <button
            style={{
                ...imgContainerStyle,
                backgroundImage: `url(${imageUrl})`,
            }}
            {...restProps}
        />
    );
};

const SubmissionPreview = props => {
    const {
        imageUrl,
        requestedBy,
        fulfilledBy,
        score,
        selected,
        toggleSelected,
    } = props;
    return (
        <Card color={selected ? "green" : undefined}>
            <ImageModal imageUrl={imageUrl} />
            {/* <Label attached="top right">{resolution}</Label> */}
            <Card.Content textAlign="left">
                <List>
                    <List.Item>
                        <b>Requested by: </b>
                        <a
                            href={`https://reddit.com/u/${requestedBy}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {requestedBy}
                        </a>
                    </List.Item>
                    <List.Item>
                        <b>Fulfilled by: </b>
                        <a
                            href={`https://reddit.com/u/${fulfilledBy}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {fulfilledBy}
                        </a>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="arrow alternate circle up outline" />
                        {score}
                    </List.Item>
                </List>
            </Card.Content>
            <Card.Content>
                <Button
                    fluid
                    basic
                    positive={selected}
                    onClick={toggleSelected}
                >
                    {selected ? "Added to album" : "Removed from album"}
                </Button>
            </Card.Content>
        </Card>
    );
};

export default SubmissionPreview;
