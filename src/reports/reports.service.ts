import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity'

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {

    }

    //create a report
    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report)
    }

    //chnage approval
    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne(id);

        if (!report) {
            throw new NotFoundException("Report Not Found");
        }

        report.approved = approved;
        return this.repo.save(report)
    }
}

