import { Injectable } from '@nestjs/common/decorators/core';
import { IReport, REPORT_TYPE, data } from '../data';
import { v4 } from 'uuid';
import { ReportResponseDTO } from '../dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: REPORT_TYPE): ReportResponseDTO[] {
    return data.report
      .filter(report => report.type === type)
      .map(report => new ReportResponseDTO(report));
  }
  getReportById(type: REPORT_TYPE, id: string): ReportResponseDTO {
    const reportsByType = data.report.filter(report => report.type === type);
    const reportById = reportsByType.find(report => report.id === id);
    if (!reportById) return null;
    return new ReportResponseDTO(reportById);
  }

  createReport(type: REPORT_TYPE, { amount, source }: Partial<IReport>) {
    const newReport = {
      id: v4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    };

    data.report.push(newReport);

    return new ReportResponseDTO(newReport);
  }

  updateReport(
    type: REPORT_TYPE,
    id: string,
    body: Partial<IReport>
  ): ReportResponseDTO {
    const reportsByType = data.report.filter(report => report.type === type);
    const reportById = reportsByType.find(report => report.id === id);
    if (!reportById) return;
    const reportIndex = data.report.findIndex(
      report => report.id === reportById.id
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    };
    return new ReportResponseDTO(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    if (reportIndex === -1) return;
    return data.report.splice(reportIndex, 1);
  }
}
