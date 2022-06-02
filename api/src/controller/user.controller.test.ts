import UserController from "./user.controller"

interface User {
    id: string;
    name: string;
    email: string;
    pass: string;
}

test("Testing Usercreation", async () => {
    const controller = new UserController();
    let usr: User = JSON.parse('{ "name": "Jon Doe", "email": "jon@doe.com", "pass": "notsosecret1234" }');
    const response = await controller.createUser(usr);
    expect(response).toBe("Already Exists")
  })