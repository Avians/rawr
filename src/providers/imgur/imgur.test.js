import { ClientHttp2Session } from "http2";
import { ImgurProvider } from "./imgur";

it("exists", async () => {
    const client = await ImgurProvider.createFromEnv();
    await client.fetchAlbumImagesFromHash("u8SRYWK");

    expect(1).toEqual(1);
}, 50000);
