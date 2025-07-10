import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }
    create(body: CreateReportDto, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: number, approved: boolean) {
        const report = await this.repo.findOneBy({ id });
        if (!report) {
            throw new NotFoundException('Report not found');
        }
        report.approved = approved;
        return this.repo.save(report)

    }

    async createEstimate({make,model,lng,lat,mileage,year}: GetEstimateDto) {
        return this.repo
            .createQueryBuilder()
            .select("AVG(price)",'price')
            .where('make=:make', {  make })
            .andWhere('model=:model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
            .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
            .andWhere('year - :year BETWEEN -3 AND 3', {year})
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)','DESC')
            .limit(3)
            .setParameters({mileage})
            .getRawOne();
    }
}
