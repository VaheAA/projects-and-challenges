import { Injectable } from '@nestjs/common';
import { REPORT_TYPE } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSummary() {
    const totalExpense = this.reportService
      .getAllReports(REPORT_TYPE.EXPENSE)
      .reduce((sum, curr) => sum + curr.amount, 0);
    const totalIncome = this.reportService
      .getAllReports(REPORT_TYPE.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense
    };
  }
}
