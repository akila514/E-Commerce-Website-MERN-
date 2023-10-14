const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let errorState = err.status == 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resourse not found.";
    errorState = 404;
  }

  res.status(errorState).json({
    message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
