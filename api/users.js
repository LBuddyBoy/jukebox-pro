import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsername } from "#db/queries/users";
import { compare } from "#utils/bcrypt";
import { createToken } from "#utils/jwt";
import requireBody from "#middleware/requireBody";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);

    if (!user) {
      return res.status();
    }

    res.status(201).json(createToken({ id: user.id }));
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!(await compare(password, user.password))) {
      return res.status(400).json("The password provided was incorrect.");
    }

    res.status(200).send(createToken({ id: user.id }));
  });
