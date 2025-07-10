import { Controller ,Post ,Body, Patch ,Param, UseGuards, Query , Get
 } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { ReportsService } from './reports.service';
import { Serialize } from 'src/interceptors/serialize.interseptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard

 } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.gurad';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService:ReportsService){}

    @Get()
    getEstimate(@Query() query:GetEstimateDto){
        return this.reportsService.createEstimate(query);
    }


    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto,@CurrentUser()  user:User){
        return this.reportsService.create(body,user);          
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReprort(@Param('id') id :number, @Body() body:ApproveReportDto ){
        return this.reportsService.changeApproval(id,body.approved)
    }
}
