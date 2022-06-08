import { prisma } from "../app";
import { User } from "@prisma/client";
import { ObjectId } from "bson";

export default class SettingsService {
  public async getSettings(jwtData: any): Promise<Object | String> {
    const userSettings = await prisma.user.findFirst({
      where: {
        id: jwtData.user_id,
      },
      select: {
        name: true,
        email: true,
        notification: true,
        course: true,
      },
    });
    if (!userSettings) return "Something went wrong!";
    return userSettings;
  }

  public async setSettings(new_settings: any, jwtData: any): Promise<String> {
    const exists = await prisma.user.findFirst({
      where: {
        id: jwtData.user_id,
      },
      select: {
        id: true,
      },
    });
    if (!exists) return "Something went wrong!";
    await prisma.user.update({
      where: {
        id: jwtData.user_id,
      },
      data: {
        email: new_settings.email,
        notification: new_settings.notification,
        courseId: new_settings.course,
      },
    });
    return "Ok!";
  }
}
export { SettingsService };
