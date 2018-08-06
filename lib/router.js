const ApiResponse = require("./api_response");

class Router {
  constructor(mount_path = "") {
    this.mount_path = mount_path
    this.routes = {}
  }

  get(path, action) {
    this.addRoute("GET", path, action);
  }

  post(path, action) {
    this.addRoute("POST", path, action);
  }

  put(path, action) {
    this.addRoute("PUT", path, action);
  }

  destroy(path, action) {
    this.addRoute("DELETE", path, action);
  }

  addRoute(httpMethod, path, action) {
    this.routes[`${httpMethod}:${this.mount_path}${path}`] = action;
  }

  async exec(request, context) {
    const action = this.routes[`${request.httpMethod}:${request.resource}`];

    if (!action) {
      return ApiResponse.notFound();
    }

    if (request.body) {
      request.body = JSON.parse(request.body);
    }

    this.lastError = null;

    return await action(request, context).catch(err => {
      this.lastError = err;
      return ApiResponse.error(err);
    });
  }
}

module.exports = Router;
