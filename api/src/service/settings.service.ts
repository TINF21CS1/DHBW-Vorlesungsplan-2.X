import {prisma} from "../app"
import { User, Courses } from '@prisma/client';
import { ObjectId } from 'bson'

export default class SettingsService {

    public async getSettings(jwtData: any): Promise<Object|String> {
        await prisma.$connect();
        const all = prisma.courses.findMany({
          where: {
              userId: jwtData.user_id
          },
          select:{
            name: true
          }
        })
        return all;
    }

    public async setSettings(courses: Courses, jwtData: any): Promise<String> {
      await prisma.$connect();
      const exists = await prisma.user.findFirst({
        where: {
          id: jwtData.user_id,
        },
        select: {
          id: true,
          selCourses: true,
        }
      })
    if(!exists)
      return "Something went wrong!";
    courses.id = new ObjectId().toString();
    courses.userId = exists.id; //user should only be able to supply name-Argument.
    await prisma.courses.create({
      data: courses,
    })      
      return "Ok!";
      }
}
export {SettingsService}