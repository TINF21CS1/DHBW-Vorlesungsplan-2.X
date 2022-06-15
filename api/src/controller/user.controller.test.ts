import UserController from "./user.controller";
import bcrypt from "bcrypt";

describe('User Tests', () => {
  const mockUser = {
    id: "1337", //Id will be discarded anyways.
    name: 'Jon Doe',
    email: 'jon@doe.com',
    pass: 'notsosecret1234',
    notification: true,
    courseId: "62a831cca565c6763002fc95",
  }
  it("Create a new user. (should return an JWT if successfull)", async () => {
    const controller = new UserController();
    await expect(controller.createUser(mockUser)).resolves.toContain("ey")
  })

  it("Test Password-Hashing and Salting-Process", async () => {
    const pass = bcrypt.hashSync(mockUser.pass, bcrypt.genSaltSync(10));
    await expect(bcrypt.compare(mockUser.pass, pass))
  })
})
