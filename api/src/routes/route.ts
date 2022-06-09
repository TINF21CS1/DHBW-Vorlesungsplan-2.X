import express from "express";
import StatusController from "../controller/status.controller";
import SettingsController from "../controller/settings.controller";
import UserController from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import CalenderController from "../controller/calender.controller";
import LogoutController from "../controller/logout.controller";
import { prisma } from "@prisma/client";
import NotificationController from "../controller/notification.controller";
import IcalController from "../controller/ical.controller";
import ical, { ICalCalendar } from "ical-generator";
const router = express.Router();

router.get("/status", async (_req, res) => {
  try {
    const controller = new StatusController();
    const response = await controller.getStatus();
    return res.status(200).json(response);
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.get("/logout", async (req, res) => {
  try {
    const controller = new LogoutController();
    await controller.logOut();
    res.cookie("access_token", "", {
      httpOnly: true,
      secure: false, //expire eh durch JWT gegeben.
      expires: new Date(),
    });
    return res.status(200).json("OK");
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.get("/calender/:course_id/:startDate/:endDate", async (req, res) => {
  try {
    const controller = new CalenderController();
    const response = await controller.getCalender(
      req.params.course_id,
      new Date(req.params.startDate),
      new Date(req.params.endDate)
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json("Malformed Input: " + error);
  }
});

router.get("/calender/course/list", async (req, res) => {
  try {
    const controller = new CalenderController();
    const response = await controller.getCourseList();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json("Malformed Input: " + error);
  }
});

router.post("/settings", async (req, res) => {
  try {
    const controller = new SettingsController();
    const settings = await controller.setSettings(
      req.cookies.access_token,
      req.body
    );
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(400).json("Malformed Input: " + error);
  }
});

router.get("/notification/:notify", async (req, res) => {
  try {
    const controller = new NotificationController();
    const settings = await controller.setNotification(
      Boolean(req.params.notify),
      req.cookies.access_token
    );
    return res.status(200).json(settings);
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.get("/notification", async (req, res) => {
  try {
    const controller = new NotificationController();
    const settings = await controller.getNotification(req.cookies.access_token);
    return res.status(200).json(settings);
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.get("/settings", async (req, res) => {
  try {
    const controller = new SettingsController();
    const settings = await controller.getSettings(req.cookies.access_token);
    if (settings == "Invalide Token") {
      return res.status(401).json(settings);
    }
    return res.status(200).json(settings);
  } catch (error) {
    return res.status(400).json("Malformed Input: " + error);
  }
});

router.post("/user", async (req, res) => {
  try {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    if (response === "Something went wrong!") {
      return res.status(409).send(response);
    }
    return res
      .cookie("access_token", response, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //expire eh durch JWT gegeben.
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Created!" });
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.post("/login", async (req, res) => {
  try {
    const controller = new LoginController();
    const response = await controller.login(req.body);
    if (response === "Email or Password wrong...") {
      return res.status(409).json(response);
    }
    return res
      .cookie("access_token", response, {
        httpOnly: true,
        secure: false, //expire eh durch JWT gegeben.
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Logged in!" });
  } catch {
    return res.status(400).json("Malformed Input");
  }
});

router.get("/ical/:course_id/:startDate?/:endDate?", async (req, res) => {
  try {
    const controller = new IcalController();
    const response = await controller.getIcal(
      req.params.course_id,
      req.params.startDate === undefined
        ? undefined
        : new Date(req.params.startDate),
      req.params.endDate === undefined
        ? undefined
        : new Date(req.params.endDate)
    );
    typeof response !== "string"
      ? (<ICalCalendar>response).serve(res)
      : res.json(response);
    return res.status(200);
  } catch (error) {
    return res.status(400).json("Malformed Input: " + error);
  }
});

export default router;
