import { Button, Icon } from "semantic-ui-react";

import React from "react";

const UploadButton = ({ children, ...restProps }) => (
    <Button
        icon
        color="green"
        fluid
        {...restProps}
        // style={{ marginBottom: "50vh" }}
    >
        <Icon name="upload" />
        {children}
    </Button>
);

export default UploadButton;
