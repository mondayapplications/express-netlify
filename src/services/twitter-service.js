const _ = require("lodash");
const Twitter = require("twitter");

class TwitterService {
  static async write(message = "I Love Twitter") {
    const client = new Twitter({
      consumer_key: "ufFOyoThIA5QboTj7IKLtduCf",
      consumer_secret: "0DrKZKmO2v1KDgknlLoKo2vDlOsabf2mNhoNyfSUHQe707lm0o",
      access_token_key: "3220263102-BPnMPStIkOmQdoX2acHKWVwcuAYBGPiHcnfj30B",
      access_token_secret: "HitT7NdFdf5ZkGyJ7q86Gn9DvkSSMapNYbiHvBwa9DRP5",
    });

    // client.post(
    //   "statuses/update",
    //   { status: message },
    //   function (error, tweet, response) {
    //     if (error) throw error;
    //     console.log(tweet); // Tweet body.
    //     console.log(response); // Raw response object.
    //   }
    // );
  }
}

module.exports = TwitterService;
