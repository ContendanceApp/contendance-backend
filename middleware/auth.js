const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, user) => {
    try {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      const auth = await prisma.users.findFirst({
        where: { email: user.email },
      });

      if (!auth) return res.status(401).json({ message: "Unauthorized" });
      req.user = auth;
      next();
    } catch (error) {
      throw new Error(error.message);
    }
  });
};
