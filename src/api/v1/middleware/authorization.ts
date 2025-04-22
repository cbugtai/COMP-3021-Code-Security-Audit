import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "officer" | "user">;
}

/**
 * Creates a middleware function that authorizes requests based on user roles
 * or resource ownership.
 *
 * @param opts - Authorization options configuration
 * @param opts.allowSameUser - When true, allows users to access their own resources
 * @param opts.hasRole - Array of roles that are permitted to access the resource
 * @returns Middleware function that performs the authorization check
 */
const isAuthorized = (opts: AuthorizationOptions): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role: string | undefined = res.locals.role;

        if (!role) {
            return next(
                new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                )
            );
        }

        // Allow access if the user's role is in the permitted roles list
        if (opts.hasRole.includes(role as "admin" | "manager" | "officer" | "user")) {
            return next();
        }

        return next(
            new AuthorizationError(
                "Forbidden: Insufficient role",
                "INSUFFICIENT_ROLE"
            )
        );
    };
};

export default isAuthorized;