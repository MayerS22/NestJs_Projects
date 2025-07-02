import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
    @Get("/home")
    getRootRoute() {
        return "Hello from Home";
    }
    @Get("contact")
    getContactPage() {
        return "Hello from Contact";
    }
}
