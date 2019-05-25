import { RedditFilter, RedditProvider } from "./reddit";

it("exists", async () => {
    const client = await RedditProvider.clientFromEnv();
    const threads = await client.getSubredditThreads({
        subreddit: "Animewallpaper",
        limit: 1,
    });
    const comments = await client.getThreadComments("bq4dz8");
    // console.log(
    //     JSON.stringify(await new RedditFilter().filterForImages(comments))
    // );
    expect(1).toEqual(1);
}, 50000);
