import config from "../config";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
	const token = req.header('token');
	if (!token) return res.status(401).json({ success: false, message: 'Token no es valido' });
	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);
		req.body.userFromToken = decoded;
		next();
	} catch (error) {
		console.log({ error });
		return res.status(401).json({ success: false, message: 'Token no es valido' });
	}
}