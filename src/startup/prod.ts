import helmet from "helmet";
import compression from "compression";

// Production function to secure our end point using helment and compress our js files using compression
module.exports = function (app: any) {
  app.use(helmet());
  app.use(compression());
};
