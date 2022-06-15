import CalenderService from "../service/calender.service";

test("Get the List of all Courses", async () => {
    const service = new CalenderService();
    expect(service.getCourseList()).resolves.toContainEqual({
        "id": "62a831cca565c6763002fc95",
        "name": "TINF21 CS1"
    })
});
