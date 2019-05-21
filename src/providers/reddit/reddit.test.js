import { RedditFilter, RedditProvider } from "./reddit";

it("exists", async () => {
    const client = await RedditProvider.clientFromEnv();
    const threads = await client.getSubredditThreads({
        subreddit: "Animewallpaper",
        limit: 1,
    });
    const comments = await client.getThreadComments(threads[0].id);
    console.log(JSON.stringify(await RedditFilter.filterForImages(comments)));
    expect(1).toEqual(1);
}, 50000);
