import { Button, Container } from "semantic-ui-react";

import React from "react";

function Site() {
    return (
        <Container textAlign="center">
            <h1>Site.js</h1>
            <p>Inside Site.js.</p>
            <Button
                content="Magic button"
                icon="earlybirds"
                labelPosition="left"
                onClick={e => {
                    e.preventDefault();
                    alert("Why do you hurt me like this?");
                }}
            />
        </Container>
    );
}

export default Site;
