import express from "express";
import StatusController from "../controller/status.controller"
import SettingsController from "../controller/settings.controller"
import UserController from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import CalenderController from "../controller/calender.controller";
import LogoutController from "../controller/logout.controller";
import { prisma } from "@prisma/client";
import NotificationController from "../controller/notification.controller";
const router = express.Router();

router.get("/status", async (_req, res) => {
    try {
        const controller = new StatusController();
        const response = await controller.getStatus();
        return res.status(200).json(response);
    }catch{
        return res.status(400).json("Malformed Input");
    }

});

router.get("/logout", async (req, res) => {
    try {
        const controller = new LogoutController()
        await controller.logOut();
        res.cookie("access_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
            expires: new Date()
          })
        return res.status(200).json("OK");

    }catch{
        return res.status(400).json("Malformed Input");
    }
});

router.get("/calender/:course_id/:startDate/:endDate", async (req, res) => {
    try {
        const controller = new CalenderController();
        const response = await controller.getCalender(req.params.course_id, new Date(req.params.startDate), new Date(req.params.endDate));
        return res.status(200).json(response);
    }catch{
        return res.status(400).json("Malformed Input");
    }
})

router.post("/settings", async (req, res) => {
   try {
        const controller = new SettingsController();
        const settings = await controller.setSettings(req.cookies.access_token, req.body)
        return res.status(200).json(settings);
    }catch{
        return res.status(400).json("Malformed Input");
    }
})

router.get("/notification/:notify", async (req, res) => {
    try {
         const controller = new NotificationController();
         const settings = await controller.setNotification(Boolean(req.params.notify), req.cookies.access_token)
         return res.status(200).json(settings);
     }catch{
         return res.status(400).json("Malformed Input");
     }
 })

 router.get("/notification", async (req, res) => {
     try {
        const controller = new NotificationController();
        const settings = await controller.getNotification(req.cookies.access_token)
        return res.status(200).json(settings);
     }catch{
         return res.status(400).json("Malformed Input")
     }
 })

router.get("/settings", async (req, res) => {
    try {
        const controller = new SettingsController();
        const settings = await controller.getSettings(req.cookies.access_token);
        return res.status(200).json(settings);
    }catch{
        return res.status(400).json("Malformed Input");
    }
});

router.post("/user", async (req, res) => {
    try{
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    if(response === "Something went wrong!"){
        return res.status(409).send(response);
    }
    return res
    .cookie("access_token", response, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
        expires: new Date(Date.now()  + (7 * 24 * 60 * 60 * 1000)),
      })
    .status(200)
    .json({ message: "Created!" });
    }catch{
        return res.status(400).json("Malformed Input");
    }
});

router.post("/login", async (req, res) => {
    try{
         const controller = new LoginController();
        const response = await controller.login(req.body);
        if(response === 'Email or Password wrong...'){
            return res.status(409).json(response);
        }
        return res
        .cookie("access_token", response, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
            expires: new Date(Date.now()  + (7 * 24 * 60 * 60 * 1000)),
        })
        .status(200)
        .json({ message: "Logged in!" });
    }catch{
        return res.status(400).json("Malformed Input");
    }
});

export default router;