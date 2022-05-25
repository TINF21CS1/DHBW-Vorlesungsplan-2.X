import StatusController from "./status.controller"

test("ping pong...", async () => {
    const controller = new StatusController();
    const response = await controller.getStatus();
    expect(response.message).toBe("Running...")
  })