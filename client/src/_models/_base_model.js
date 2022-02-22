import Ajv from "ajv";
const ajv = new Ajv({
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: true,
});

export default class Base_Model {
  #schema;
  constructor(data, schema = null) {
    if (!(data instanceof Object) || !data) {
      data = {};
      return null;
    }

    if (schema) {
      this.#schema = schema;
      const validate = ajv.compile(this.#schema);
      validate(data);
    }
    Object.keys(data).map((key) => (this[key] = data[key]));
    return this;
  }

  toJson() {
    const data = { ...this };
    for (let key in data) {
      if (key.startsWith("#") || data[key] instanceof Function) {
        delete data[key];
      }
    }
    return data;
  }
}
