import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourVerySecretKey";

export function verifyUserToken(request) {
  const token = request.headers.get("authorization") || request.headers.get("Authorization");

  if (!token) {
    return { error: "Access denied. No token provided.", status: 401 };
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(cleanToken, JWT_SECRET);
    if (decoded.role !== "user") {
      return { error: "Invalid user token.", status: 403 };
    }
    return { user: decoded };
  } catch (err) {
    return { error: "Invalid token.", status: 400 };
  }
}

export function verifyAdminToken(request) {
  const token = request.headers.get("authorization") || request.headers.get("Authorization");

  if (!token) {
    return { error: "Access denied. No token provided.", status: 401 };
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(cleanToken, JWT_SECRET);
    if (decoded.role !== "admin") {
      return { error: "Invalid admin token.", status: 403 };
    }
    return { admin: decoded };
  } catch (err) {
    return { error: "Invalid token.", status: 400 };
  }
}

export function generateToken(payload, expiresIn = "1d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
