// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "CLIENT" | "MANAGER" | "ADMIN";
  };
}

// Protect middleware
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
      // role: "CLIENT" | "MANAGER" | "ADMIN";
    };
    req.user = {
      id: payload.id,
      role: payload.role.toUpperCase() as "CLIENT" | "MANAGER" | "ADMIN",
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

// restrictTo — higher-order function
export const restrictTo = (...roles: ("CLIENT" | "MANAGER" | "ADMIN")[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("👮 Authorization Check:", {
      userRole: req.user?.role,
      requiredRoles: roles,
      match: req.user && roles.includes(req.user.role),
    });
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You shall not pass!" });
    }
    next();
  };
};
