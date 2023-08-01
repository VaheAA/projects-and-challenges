import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe
} from '@nestjs/common';
import { IReport, REPORT_TYPE } from '../data';
import { ReportService } from './report.service';
import {
  CreateReportDTO,
  ReportResponseDTO,
  UpdateReportDTO
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(@Param('type') type: string): ReportResponseDTO[] {
    const reportType =
      type === 'income' ? REPORT_TYPE.INCOME : REPORT_TYPE.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(REPORT_TYPE)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDTO {
    const reportType =
      type === 'income' ? REPORT_TYPE.INCOME : REPORT_TYPE.EXPENSE;

    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDTO,
    @Param('type', new ParseEnumPipe(REPORT_TYPE)) type: string
  ): ReportResponseDTO {
    const reportType =
      type === 'income' ? REPORT_TYPE.INCOME : REPORT_TYPE.EXPENSE;

    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(REPORT_TYPE)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDTO
  ): ReportResponseDTO {
    const reportType =
      type === 'income' ? REPORT_TYPE.INCOME : REPORT_TYPE.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
