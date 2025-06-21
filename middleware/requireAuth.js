// middlewares/requireAuth.ts
import { clerkClient } from "../clerk.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Missing auth header');

    const token = authHeader.replace('Bearer ', '');
    const session = await clerkClient.verifyToken(token);

    req.clerkUserId = session.userId;
    req.clerkSession = session;

    next();
  } catch (err) {
    console.error('Clerk verification error:', err.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
