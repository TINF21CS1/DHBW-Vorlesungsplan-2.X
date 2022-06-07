import { Lecture } from "@prisma/client";
import { prisma } from "../app"

export default class CalenderService {

  public async getCourseList(): Promise<Array<{ id: string, name: string }>> {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        name: true,
      }
    });
    return courses.map(course => ({ id: course.id, name: course.name }));
  }

  public async getCalender(idCourse: string, startD: Date, endD: Date): Promise<Lecture[] | String> {
    const result: Array<Lecture> = [];
    try {
      const res = await prisma.module.findMany({
        where: {
          courseId: idCourse,
        },
        select: {
          id: true,
          name: true,
          lectures: true,
        }
      });
      console.log(res);
      return res.map(module => {
        const lectures = module.lectures.filter(lecture => {
          const start = new Date(lecture.start);
          const end = new Date(lecture.end);
          return startD < end && endD > start;
        });
        return lectures as Lecture[];
      }).flat();
    } catch (err) {
      return "Wrong-Object-ID";
    }
  }
}
export { CalenderService }