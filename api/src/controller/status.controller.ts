import { Tags, Get, Route } from "tsoa";

interface StatusResponse {
  message: string;
}

@Tags("Health-Check")
@Route("status")
export default class StatusController {
  @Get("/")
  public async getStatus(): Promise<StatusResponse> {
    return {
      message: "Running...",
    };
  }
}

export { StatusController };
