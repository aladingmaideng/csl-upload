module.exports = (app) => {
  const { router, controller, service } = app;
  router.get("/", controller.home.upload);
  router.post("/", controller.home.index);
};
