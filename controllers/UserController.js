const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkAccount = await prisma.users.findFirst({
        where: { email },
        include: { roles: {}, study_groups: {} },
      });

      if (checkAccount) {
        if (await bcrypt.compare(password, checkAccount.password)) {
          delete checkAccount.password;
          const payload = {
            user_id: checkAccount.user_id,
            email: checkAccount.email,
          };
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
            expiresIn: "30 days",
          });

          res.status(200).json({
            message: "Login Succeed",
            data: { user: checkAccount, token: accessToken },
          });
        } else {
          res.status(404).json({ message: "Email or password is invalid" });
          return;
        }
      } else {
        res.status(404).json({ message: "Email or password is invalid" });
        return;
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        fullname,
        email,
        password,
        sid_eid,
        gender,
        role_id,
        study_group_id,
      } = req.body;
      const response = await prisma.users.create({
        data: {
          fullname,
          email,
          password,
          sid_eid,
          gender,
          role_id,
          study_group_id,
        },
      });

      res.status(201).json({ message: "Data Created!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  me: async (req, res) => {
    try {
      const user_id = req.user.user_id;
      const response = await prisma.users.findFirst({
        where: {
          user_id,
        },
        include: {
          roles: {},
          study_groups: {},
        },
      });
      if (!response) {
        return res.status(404).json({ message: "Not Found!" });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const response = await prisma.users.findMany({});
      if (!response) {
        res.status(200).json({ message: "Data Retrieved!", data: [] });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getUsersByRole: async (req, res) => {
    try {
      const { role_id } = req.params;
      const response = await prisma.users.findMany({
        where: role_id,
      });
      if (!response) {
        res.status(200).json({ message: "Data Retrieved!", data: [] });
      }

      res.status(200).json({ message: "Data Retrieved!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { fullname, email, sid_eid, gender, role_id, study_group_id } =
        req.body;

      const response = await prisma.users.update({
        where: {
          user_id,
        },
        data: {
          fullname,
          email,
          sid_eid,
          gender,
          role_id,
          study_group_id,
        },
      });

      res.status(200).json({ message: "Data Updated!", data: response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const response = await prisma.users.delete({
        where: {
          user_id,
        },
      });

      res.status(200).json({ message: "Data Deleted!" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { user_id } = req.user;
      const { old_password, new_password } = req.body;

      const user_data = await prisma.users.findFirst({
        where: {
          user_id,
        },
      });

      if (await bcrypt.compare(old_password, user_data.password)) {
        if (new_password.length >= 8) {
          const update_password = await prisma.users.update({
            where: {
              user_id,
            },
            data: {
              password: bcrypt.hashSync(new_password),
            },
          });
          if (!update_password)
            return res.status(500).json({ message: "Can't update password!" });

          res.status(200).json({ message: "Password successfully updated!" });
        } else {
          return res
            .status(500)
            .json({ message: "Password must be at least 8 characters!" });
        }
      } else {
        res.status(404).json({ message: "Old password doesn't match!" });
        return;
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
