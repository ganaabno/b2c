import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: "USER" | "MANAGER" | "ADMIN" };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = bearer.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };
    req.user = { id: payload.id, role: payload.role as any };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

export const restrictTo = (...roles: ("USER" | "MANAGER" | "ADMIN")[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You shall not pass!" });
    }
    next();
  };
};
