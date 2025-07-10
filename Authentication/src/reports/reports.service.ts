import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
    create(body: CreateReportDto, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }
    
    async changeApproval(id:number , approved : boolean){
        const report = await this.repo.findOneBy({ id });
        if (!report){
            throw new NotFoundException('Report not found');
        }
        report.approved=approved;
        return this.repo.save(report)

    }
}
