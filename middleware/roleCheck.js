const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports = {
  admin: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null)
      return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, user) => {
      try {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const auth = await prisma.users.findFirst({
          where: { email: user.email },
        });

        if (!auth) return res.status(401).json({ message: "Unauthorized" });
        else if (auth.role_id !== 3)
          return res.status(403).json({ message: "Forbidden!" });
        next();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },

  dosen: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null)
      return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, user) => {
      try {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const auth = await prisma.users.findFirst({
          where: { email: user.email },
        });

        if (!auth) return res.status(401).json({ message: "Unauthorized" });
        else if (auth.role_id !== 2)
          return res.status(403).json({ message: "Forbidden!" });
        next();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },

  adminOrDosen: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null)
      return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, user) => {
      try {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const auth = await prisma.users.findFirst({
          where: { email: user.email },
        });

        if (!auth) return res.status(401).json({ message: "Unauthorized" });
        else if (auth.role_id !== 2) {
          if (auth.role_id !== 3)
            return res.status(403).json({ message: "Forbidden!" });
        }
        next();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },
};
