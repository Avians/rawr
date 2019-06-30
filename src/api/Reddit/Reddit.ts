export interface RedditComment {
  author: string;
  body: string;
  permaLink: string;
  upVotes: number;
  replies: RedditComment[];
}

export interface RedditThread {
  rootComments: RedditComment[];
}

class RedditFetcher {
  private _response: any[] = [];

  get response() {
    return this._response;
  }

  private async fetchImpl(url: string, after: string) {
    const jsonUrl =
        `${url}.json?limit=100${after.length > 0 ? '&after=' + after : ''}`;
    const response = await fetch(jsonUrl);

    const responseJSON = await response.json();
    this._response.push(responseJSON);

    if (after.length > 0 && responseJSON.data.after) {
      this.fetchImpl(url, responseJSON.data.after);
      return;
    }
  }

  async fetch(url: string) {
    await this.fetchImpl(url, '');
  }
}

const ParseJsonAsComments = (json: any): RedditComment[] => {
  let redditComments: RedditComment[] = [];
  for (const {
         data: {author, body, permalink, score, replies}
       } of json.data.children) {
    let redditComment: RedditComment = {
      author: author,
      body: body,
      upVotes: score,
      permaLink: permalink,
      replies: [],
    };

    if (typeof replies !== 'string') {
      redditComment.replies = ParseJsonAsComments(replies);
    }

    redditComments.push(redditComment);
  }


  return redditComments;
};

export interface IReddit {
  getRedditThread: (threadUrl: string) => Promise<RedditThread>;
}

export const Reddit: IReddit = {
  getRedditThread: async(threadUrl: string): Promise<RedditThread> => {
    const reddit = new RedditFetcher();
    await reddit.fetch(threadUrl);
    console.log('begin')
    const rootComments = ParseJsonAsComments(reddit.response[0][1]);
    console.log('end')

    return {rootComments};
  },
};