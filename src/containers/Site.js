import { Button, Container, Grid, Header } from "semantic-ui-react";
import React, { Component } from "react";
import { RedditFilter, RedditProvider } from "../providers/reddit/reddit";
import { SubmissionPreview, UrlBar } from "components";

import { ImgurProvider } from "../providers/imgur/imgur";

const urlValidationRegex = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

class Site extends Component {
    state = {
        url: "",
        loading: false,

        redditClient: null,
        imgurClient: null,

        watchedThreadId: "",
        results: [
            {
                imageUrl: "https://i.imgur.com/YnOHxh6.jpg",
                resolution: "200x200",
                requestedBy: "notzain",
                fulfilledBy: "yoshi",
                score: "100",
            },
        ],
    };

    async componentDidMount() {
        const redditClient = await RedditProvider.clientFromEnv();
        const imgurClient = await ImgurProvider.createFromEnv();
        this.setState({ redditClient: redditClient, imgurClient: imgurClient });
    }

    async componentWillUpdate(nextProps, nextState) {
        if (this.state.watchedThreadId !== nextState.watchedThreadId) {
            const comments = await this.state.redditClient.getThreadComments(
                nextState.watchedThreadId
            );
            const commisions = await new RedditFilter().filterForImages(
                comments
            );

            // dubious place to update state?
            this.setState({
                loading: false,
                results: commisions,
            });
        }
    }

    updateUrlValue = evt => {
        this.setState({ url: evt.target.value });
    };

    handleUrlLoad = () => {
        const url = this.state.url;

        if (url.match(urlValidationRegex)) {
            const { subreddit, threadId } = RedditFilter.urlToSubredditAndId(
                url
            );
            if (!subreddit || !threadId) {
                alert("Invalid Reddit URL");
                return;
            }

            this.setState({
                loading: true,
                watchedThreadId: threadId,
            });

            // TODO: Set state back to false in a 'then' after the magic.
        } else {
            alert("No valid URL given!");
        }
    };

    handleKeyPress = ({ key }) => {
        if (key === "Enter") this.handleUrlLoad();
    };

    onUploadClick = async () => {
        await this.state.imgurClient.createNewAlbum("RAWR");
        for (const result of this.state.results) {
            const description = [
                `Requested by: ${result.requested_by}`,
                `Fulfilled by: ${result.fulfilled_by}`,
            ];
            try {
                await this.state.imgurClient.uploadImageToAlbum({
                    imageUrl: result.image,
                    description: description.join("\n"),
                });
            } catch (err) {
                console.log(err.message);
            }
        }

        alert(this.state.imgurClient.albumUrl());
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

                <br />

                <Grid columns={4} stackable>
                    {this.state.results.map(request => (
                        <Grid.Column width={4}>
                            <SubmissionPreview
                                imageUrl={request.image}
                                resolution="200x200"
                                requestedBy={request.requested_by}
                                fulfilledBy={request.fulfilled_by}
                                score={request.score}
                            />
                        </Grid.Column>
                    ))}
                </Grid>

                <Button onClick={this.onUploadClick}>Upload now</Button>
            </Container>
        );
    }
}

export default Site;
