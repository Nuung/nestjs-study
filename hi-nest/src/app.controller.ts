import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get()
    home() {
        return "Hello! this is just app.controller";
    }
}
