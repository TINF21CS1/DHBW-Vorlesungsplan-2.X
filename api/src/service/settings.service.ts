import {prisma} from "../app"
import { User, Courses } from '@prisma/client';
import { ObjectId } from 'bson'

export default class SettingsService {

    public async getSettings(jwtData: any): Promise<Object|String> {
        await prisma.$connect();
        const exists = await prisma.user.findFirst({
            where: {
              email: jwtData.Email,
            },
          })
        if(!exists)
          return "Something went wrong!";
        exists.id = "";exists.pass = "";
        const all = prisma.courses.findMany({
          where: {
              userId: jwtData.id
          },
          select:{
            name: true
          }
        })
        return Object.assign({}, all, exists);
    }

    public async setSettings(courses: Courses, jwtData: any): Promise<String> {
      await prisma.$connect();
      const exists = await prisma.user.findFirst({
        where: {
          email: jwtData.Email,
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
    const all2 = await prisma.user.update({
      data: {
        notification: {
          set: true
        }
      },
      where: {
        email: jwtData.email
      }
    })
      return "Ok!";
      }
}
export {SettingsService}