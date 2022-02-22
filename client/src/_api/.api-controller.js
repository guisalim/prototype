import axios from "axios";
import APIResponse from "./.api-response";

export const baseApiRoute = "/api/";

export const getBaseURL = () => {
  const { REACT_APP_GATEWAY_URL, REACT_APP_GATEWAY_PORT } = process.env;
  if (REACT_APP_GATEWAY_URL && REACT_APP_GATEWAY_PORT) {
    return `${REACT_APP_GATEWAY_URL}:${REACT_APP_GATEWAY_PORT}`;
  }
  switch (process.env.NODE_ENV) {
    default:
      return `http://localhost:3000`;
  }
};
axios.defaults.baseURL = getBaseURL();
axios.defaults.headers["Content-Type"] = "application/json";

export const responseHandler = (response, { endpoint, params }) => {
  const content = new APIResponse({ ...response, endpoint, params });
  return content.getData();
};

export const errorHandle = (error, { endpoint, params }) => {
  const e = typeof error === "object" ? error : { error };
  const content = new APIResponse({
    ...e,
    error: e?.message,
    endpoint,
    params,
  });
  return content.getError();
};

/**
 * @function get
 * @param {string} endpoint
 * @param {object} params
 */
export const GET = async (endpoint, params) =>
  axios
    .get(`${baseApiRoute}${endpoint}`, { params })
    .then((response) => responseHandler(response, { endpoint, params }))
    .catch((e) => errorHandle(e, { endpoint, params }));

/**
 * @function post
 * @param {string} endpoint
 * @param {object} params
 */
export const POST = async (endpoint, params) =>
  axios
    .post(`${baseApiRoute}${endpoint}`, params)
    .then((response) => responseHandler(response, { endpoint, params }))
    .catch((e) => errorHandle(e, { endpoint, params }));

/**
 * @function put
 * @param {string} endpoint
 * @param {object} params
 */
export const PUT = async (endpoint, params) =>
  axios
    .put(`${baseApiRoute}${endpoint}`, params)
    .then((response) => responseHandler(response, { endpoint, params }))
    .catch((e) => errorHandle(e, { endpoint, params }));

/**
 * @function delete
 * @param {string} endpoint
 * @param {object} params
 */
export const DELETE = async (endpoint, params) =>
  axios
    .delete(`${baseApiRoute}${endpoint}`, params)
    .then((response) => responseHandler(response, { endpoint, params }))
    .catch((e) => errorHandle(e, { endpoint, params }));
