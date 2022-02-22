import * as axios from "./.api-controller";

export const routes = {
  list: `games/`,
  get: `games/`,
  add: `games/`,
  edit: `games/`,
  delete: `games/`,
};

//GET
export const List = (params) => axios.GET(routes.list, params);
export const Get = (params, id = 0) => axios.GET(routes.list + id, params);

//POST
export const Add = (params) => axios.POST(routes.add, params);

//PUT
export const Edit = (params, id = 0) => axios.PUT(routes.edit + id, params);

//DELETE
export const Delete = (params, id = 0) =>
  axios.DELETE(routes.delete + id, params);
