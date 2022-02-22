import { Base_Model } from "_models";

const schema = {
  type: "object",
  properties: {
    error: { type: ["array", "string"] },
    status: { type: "integer" },
    endpoint: { type: "string" },
    params: { type: "object" },
    default: { type: "object" },
  },
};

export default class APIResponse extends Base_Model {
  constructor(content = {}) {
    super(content, schema);
  }

  getData = function () {
    const { data, error } = this.toJson();
    if (error) {
      return { error };
    }
    return data;
  };

  getError = function () {
    return { error: this.error };
  };
}
