import { Base_Model } from "_models";

const schema = {
  type: "object",
  properties: {
    category: { type: "string" },
    _id: { type: "string" },
    title: { type: "string" },
    subtitle: { type: "string" },
    description: { type: "string" },
    images: { type: "array" },
    type: { type: "number" },
    tags: { type: "array", default: [] },
    author: { type: "string" },
    replayBundleUrlJson: { type: "string" },
    duration: { type: "number" },
    isDownloadable: { type: "boolean" },
    isStreamable: { type: "boolean" },
    isPremiumContent: { type: "boolean" },
    version: { type: "string" },
  },
};

export default class GameModel extends Base_Model {
  constructor(data = {}) {
    super(data, schema);
  }
}
