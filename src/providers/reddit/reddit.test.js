import { RedditFilter, RedditProvider } from "./reddit";

it("exists", async () => {
    const client = await RedditProvider.clientFromEnv();
    const threads = await client.getSubredditThreads({
        subreddit: "Animewallpaper",
        limit: 1,
    });
    const comments = await client.getThreadComments("bs3d1b");
    console.log(JSON.stringify(await RedditFilter.filterForImages(comments)));
    expect(1).toEqual(1);
}, 50000);
