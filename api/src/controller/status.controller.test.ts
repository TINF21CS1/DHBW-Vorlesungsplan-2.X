import StatusController from "./status.controller";

test("Testing Status of the Backend-API...", async () => {
  const controller = new StatusController();
  const response = await controller.getStatus();
  expect(response.message).toBe("Running...");
});
