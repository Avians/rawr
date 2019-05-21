import React from "react";
import { Input } from "semantic-ui-react";

const UrlBar = props => {
    const { loading, onActionClick, ...restProps } = props;
    return (
        <Input
            fluid
            loading={loading}
            action={
                !loading && {
                    content: "Load",
                    onClick: onActionClick,
                    primary: true,
                }
            }
            placeholder="Reddit thread URL..."
            {...restProps}
        />
    );
};

export default UrlBar;
