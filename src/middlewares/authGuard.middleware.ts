import { UnAuthorizedError, UserSchemaType } from '@/types';
import { sendError, verifyToken } from '@/utils';
import { NextFunction, Request, Response } from 'express';

interface AuthGuardType {
  roles?: UserSchemaType['role'][];
}
/**
 * Middleware for checking authentication & authorization
 * @param data
 * @example:
 * appRouter.use('/', authGuard(), (req, res, next) => {
 * // Your another middleware logic
 * })
 */
const authGuard =
  (data?: AuthGuardType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessibleRoles = data?.roles;
      const encoded = verifyToken(req);
      const canAccess =
        encoded.role === 'admin' ||
        !accessibleRoles?.length ||
        accessibleRoles.includes(encoded.role);

      if (canAccess) {
        next();
      } else
        throw new UnAuthorizedError(
          'You do not have permission to access this route'
        );
    } catch (error) {
      sendError(res, error);
    }
  };

export default authGuard;
