import { Request, Response, NextFunction } from 'express';

/**
 * Role checking guard middleware.
 * @param allowedRoles - Roles that are allowed to access the route.
 * @returns Express middleware function.
 */
export function roleGuard(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Assuming the user object is attached to request by an auth middleware
    const user = req.user as { role?: string } | undefined;

    if (!user?.role) {
      return res.status(401).json({ message: 'Unauthorized: No user role found' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
    }

    // User has an allowed role, proceed to next middleware/handler
    next();
  };
}