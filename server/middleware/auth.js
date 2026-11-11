export const authMiddleware = (req, res, next) => {
	const expectedPassword = process.env.ADMIN_PASSWORD;

	const authHeader = req.headers.authorization;

	const providedPassword = authHeader?.startsWith('Bearer ')
		? authHeader.substring(7)
		: null;

	if (!providedPassword || providedPassword !== expectedPassword) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized: Invalid or missing credentials.',
		});
	}

	next();
};
