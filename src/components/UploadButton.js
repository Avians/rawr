import React from "react";
import { Button, Icon } from "semantic-ui-react";

const UploadButton = ({ children, ...restProps }) => (
    <Button
        icon
        color="green"
        fluid
        {...restProps}
        style={{ marginBottom: "50vh" }}
    >
        <Icon name="upload" />
        {children}
    </Button>
);

export default UploadButton;
