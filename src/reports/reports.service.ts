import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity'
import { GetEstimateDto } from './dtos/get-estimate.dto'

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {

    }

    createEstimate(estimateDtp: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select('*')
            .where('make = :make', { make: estimateDtp.make })
            .getRawMany()
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

