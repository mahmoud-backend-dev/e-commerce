export const globalError = (err, req, res, next) => {
  return res
    .status(err.cause||500)
    //.status(["cause"] || 500)
    .json({ message: err.message || err, stack: err.stack });
};
