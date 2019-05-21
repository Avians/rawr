import React, { Component } from "react";
import { Header, Container } from "semantic-ui-react";
import { UrlBar } from "components";

const urlValidationRegex = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

class Site extends Component {
    state = {
        url: "",
        loading: false,
    };

    updateUrlValue = evt => {
        this.setState({ url: evt.target.value });
    };

    handleUrlLoad = () => {
        const url = this.state.url;

        if (url.match(urlValidationRegex)) {
            this.setState({ loading: true });
            alert(`Do magic on '${url}'!`);
            // TODO: Set state back to false in a 'then' after the magic.
        } else {
            alert("No valid URL given!");
        }
    };

    handleKeyPress = ({ key }) => {
        if (key === "Enter") this.handleUrlLoad();
    };

    render() {
        return (
            <Container textAlign="center" style={{ paddingTop: "1.25em" }}>
                <Header as="h1">RAWR</Header>
                <UrlBar
                    loading={this.state.loading}
                    value={this.state.url}
                    onChange={this.updateUrlValue}
                    onActionClick={this.handleUrlLoad}
                    onKeyPress={this.handleKeyPress}
                />
            </Container>
        );
    }
}

export default Site;
