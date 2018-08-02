function error(err = {}) {
  return {
    statusCode: 500,
    body: {
      err: err.message,
      message: "Something went wroing please try after sometime."
    }
  }
}

function notFound(message = null) {
  return {
    statusCode: 404,
    body: {
      message: message || "Not found"
    }
  }
}

function notAuthorize(message) {
  return {
    statusCode: 401,
    body: {
      message: message || "Not authorize to access"
    }
  }
}

function ok(data) {
  return {
    statusCode: 200,
    body: data
  }
}

function validationErrors(resource, errors) {
  const messages = {};
  for(let path in errors){
    messages[path] = errors[path].message;
  }

  return {
    statusCode: 422,
    body: { [resource]: messages }
  }
}

module.exports = {
  notFound: notFound,
  notAuthorize: notAuthorize,
  error: error,
  validationErrors: validationErrors,
  ok: ok
}
