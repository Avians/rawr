import { Button, Container } from "semantic-ui-react";

import React from "react";
import snoowrap from "snoowrap";

function Site() {
    snoowrap
        .fromAuthCode({
            code: "_l5HEWYv64eJQw8hLMhkddDFFAc",
            userAgent: "RAWR",
            clientId: "somethingsomething",
            redirectUri: "example.com",
        })
        .then(r => {
            console.log(r);
        });

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
                }}
            />
        </Container>
    );
}

export default Site;
