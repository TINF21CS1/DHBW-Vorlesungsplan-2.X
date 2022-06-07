import { Lecture } from "@prisma/client";
import { ObjectId } from "bson";
import {prisma} from "../app"

export default class CalenderService {

    public async getCalender(idCourse: string, startD: Date, endD: Date): Promise<Lecture[]|String> {
        const result: Array<Lecture> = [];
        await prisma.$connect();
        try {
        const course = await prisma.course.findFirst({
            where: {
              id: idCourse,
            },
            select: {
              modules: true,
            }
          })
          if(!course||course.modules.length==0)
            return "No Course-Id";
          for (var i = 0; i < course.modules.length; i++) {
            const module = await prisma.module.findFirst({
              where: {
                id: course.modules[i].id,
              },
              select: {
                Lecture: true,
              }
            })
            if(!module||module.Lecture.length==0)
                continue;
             for (var j = 0; j < module.Lecture.length; j++) {
              const lecture = await prisma.lecture.findFirst({
                where: {
                  id: module.Lecture[j].id,
                  start: {
                    gte: startD,
                  },
                  end: {
                    lte: endD,
                  }
                },
              })
              if(lecture)
                result.push(lecture);
            }
          }
        } catch(err) {
          return "Wrong-Object-ID";
        }
        return result;
    }
}
export {CalenderService}