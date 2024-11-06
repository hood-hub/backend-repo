import { Request, Response, NextFunction } from "express";

class ErrorMiddleware {
  static notFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
  }

  static serverError = (res: any, err: any) => {
    res.status(500).send({
      message: err.message || "Internal Server Error",
      data: null,
    });
  };
  static errorHandler(message: string, status: number) {
    const error: any = new Error(message);
    error.status = status;
    throw error;
  }
}

export default ErrorMiddleware;
