import snoowrap from "snoowrap";

export class RedditProvider {
    constructor(client) {
        this.client = client;
    }

    static async clientFromEnv() {
        return new RedditProvider(
            new snoowrap({
                userAgent: "RAWR",
                clientId: process.env.REACT_APP_REDDIT_CLIENT_ID,
                clientSecret: process.env.REACT_APP_REDDIT_CLIENT_SECRET,
                refreshToken: process.env.REACT_APP_REDDIT_REFRESH_TOKEN,
            })
        );
    }

    async findSubreddit({ query, exactMatch = false }) {
        return await this.client.searchSubredditNames({
            query: query,
            exact: exactMatch,
        });
    }

    async getSubreddit({ subreddit }) {
        return await this.client.getSubreddit(subreddit);
    }

    async getSubredditThreads({ subreddit, sort = "hot", limit = 0 }) {
        switch (sort.toLowerCase()) {
            case "hot":
                return await this.client.getHot(subreddit, {
                    limit: limit,
                });
            case "new":
                return await this.client.getNew(subreddit, {
                    limit: limit,
                });
            case "top":
                return await this.client.getTop(subreddit, {
                    limit: limit,
                });
            case "controversial":
                return await this.client.getControversial(subreddit, {
                    limit: limit,
                });
            case "rising":
                return await this.client.getRising(subreddit, {
                    limit: limit,
                });
            default:
                return [];
        }
    }

    async getThreadComments(threadId) {
        return await this.client
            .getSubmission(threadId)
            .expandReplies({ limit: Infinity, depth: Infinity }).comments;
    }
}
