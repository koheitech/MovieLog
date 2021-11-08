module.exports = function (handler) {
  /*  This is kinda like a factory function,
   *  which takes router handler as an argument,
   *  then, pass the reference of the given function as route handler for express framework.
   */
  return async (req, res, next) => {
    try {
      await handler();
    }
    catch (ex) {
      next(ex);
    }
  };
}