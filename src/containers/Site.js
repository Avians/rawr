import { Container, Divider, Header, Input, Progress } from "semantic-ui-react";
import React, { Component } from "react";
import { RedditFilter, RedditProvider } from "providers/reddit/reddit";

import { ImgurProvider } from "../providers/imgur/imgur";
import { SelectionGrid } from "containers";
import UploadButton from "components/UploadButton";
import { UrlBar } from "components";

const urlValidationRegex = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

class Site extends Component {
    state = {
        url: "",
        loading: false,
        albumName: "RAWR",
        uploading: false,
        amountUploaded: 0,

        redditClient: null,
        imgurClient: null,

        watchedThreadId: "",
        results: [],
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

            // z: dubious place to update state?
            // r: idk it works, so lesgo
            this.setState({
                loading: false,
                results: commisions.map((value, index) => ({
                    ...value,
                    selected: value.score >= 1,
                    toggleSelected: () => this.toggleSelected(index),
                })),
            });
        }
    }

    toggleSelected = index => {
        const results = this.state.results;
        results[index] = {
            ...results[index],
            selected: !results[index].selected,
        };
        this.setState({ results: results });
    };

    updateUrlValue = evt => {
        this.setState({ url: evt.target.value });
    };

    updateAlbumName = evt => {
        this.setState({ albumName: evt.target.value });
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

    handleAlbumNameKeyPress = ({ key }) => {
        if (key === "Enter") this.onUploadClick();
    };

    onUploadClick = async () => {
        this.setState({ uploading: true });
        await this.state.imgurClient.createNewAlbum(this.state.albumName);

        const filtered = this.state.results.filter(value => value.selected);
        filtered.forEach(async result => {
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
                console.error(err);
            } finally {
                this.setState((prevState, _) => ({
                    amountUploaded: prevState.amountUploaded + 1,
                }));

                if (this.state.amountUploaded === filtered.length) {
                    // TODO: dont alert, think about muh ux
                    alert(this.state.imgurClient.albumUrl());

                    this.setState({ uploading: false, amountUploaded: 0 });
                }
            }
        });
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
                {this.state.results.length > 0 && (
                    <>
                        <Divider horizontal>Fulfilled Requests</Divider>
                        <SelectionGrid data={this.state.results} />
                        <Divider horizontal>Upload</Divider>
                        <Input
                            fluid
                            label="Album Name"
                            value={this.state.albumName}
                            onChange={this.updateAlbumName}
                            onKeyPress={this.handleAlbumNameKeyPress}
                        />
                        {this.state.uploading && (
                            <Progress
                                value={this.state.amountUploaded}
                                total={this.state.results.length}
                                progress="ratio"
                            />
                        )}
                        <UploadButton
                            onClick={this.onUploadClick}
                            disabled={this.state.uploading}
                        >
                            Upload to Imgur
                        </UploadButton>
                    </>
                )}
            </Container>
        );
    }
}

export default Site;
