import { ImgurProvider } from "./imgur";

it("exists", async () => {
    const client = await ImgurProvider.createFromEnv();
    await client.createNewAlbum("test");
    console.log(client.album);

    expect(1).toEqual(1);
}, 50000);
