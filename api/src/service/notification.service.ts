import { prisma } from "../app";

export default class NotificationService {
  public async setNotification(notify: boolean, jwtData: any): Promise<String> {
    await prisma.$connect();
    const usr = await prisma.user.findFirst({
      where: {
        id: jwtData.user_id,
      },
    });
    if (!usr) return "Error";
    await prisma.user.update({
      where: {
        id: usr.id,
      },
      data: {
        notification: notify,
      },
    });
    return "OK";
  }

  public async getNotification(jwtData: any): Promise<String | Object> {
    await prisma.$connect();
    const exists = await prisma.user.findFirst({
      where: {
        id: jwtData.user_id,
      },
    });
    if (!exists) return "Something went wrong!";
    exists.id = "";
    exists.pass = "";
    return exists;
  }
}
export { NotificationService };
