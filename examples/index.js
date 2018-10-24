const { Router, ApiResponse } = require("lambda-routes");
const router = new Router("/v1");

router.get("/users", async (event, context) => {
  return ApiResponse.ok([{ id: 1, name: "User1" }]);
});

router.post("/users", async (event, context) => {
  return ApiResponse.ok({ id: 1, name: "User1" });
});

router.get("/users/{id}", async (event, context) => {
  return ApiResponse.notFound("User not found");
});

router.put("/users/{id}", async (event, context) => {
  return ApiResponse.notAuthorize();
});

router.delete("/users/{id}", async (event, context) => {
  return ApiResponse.ok({ id: 1 });
});

// AWS Lambda proxy event handler
exports.handler = async (event, context) => {
  if (!event.requestContext.authorizer) {
    return ApiResponse.notAuthorize();
  }

  const response = await router.exec(event);

  if(router.lastError){
    console.error(router.lastError);
  }

  return response;
};
