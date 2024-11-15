import express from "express";
import user from "../routes/user";
import upload from "../routes/upload";
import post from "../routes/post";
import group from "../routes/group";
import message from "../routes/message";

function routes(app: any) {
  app.use(express.json());
  app.use("/api/v1/user", user);
  app.use("/api/v1/upload", upload);
  app.use("/api/v1/post", post);
  app.use("/api/v1/message", message);
  app.use("/api/v1/group", group);
}

export default routes;
