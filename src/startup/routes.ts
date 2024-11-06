import express from "express";
import user from "../routes/user";
import upload from "../routes/upload";
import post from "../routes/post";
import group from "../routes/group";

function routes(app: any) {
  app.use(express.json());
  app.use("/api/v1/user", user);
  app.use("/api/v1/upload", upload);
  app.use("/api/v1/post", post);
  app.use("/api/v1/group", group);
}

export default routes;
