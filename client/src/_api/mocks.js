import * as axios from "./.api-controller";

export const routes = {
  reset: `mocks/`,
};

//POST
export const Reset = (params) => axios.POST(routes.reset, params);
