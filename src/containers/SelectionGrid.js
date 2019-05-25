import React from "react";
import { Card } from "semantic-ui-react";
import { SubmissionPreview } from "components";

const renderPreview = (
    { image, requested_by, fulfilled_by, score, selected, toggleSelected },
    index
) => {
    return (
        <SubmissionPreview
            key={index}
            index={index}
            imageUrl={image}
            requestedBy={requested_by}
            fulfilledBy={fulfilled_by}
            score={score}
            selected={selected}
            toggleSelected={toggleSelected}
        />
    );
};

const SelectionGrid = props => {
    const { data } = props;
    return <Card.Group centered>{data.map(renderPreview)}</Card.Group>;
};

export default SelectionGrid;
