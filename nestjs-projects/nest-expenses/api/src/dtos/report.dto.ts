import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { REPORT_TYPE } from 'src/data';

export class CreateReportDTO {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDTO {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;
}

export class ReportResponseDTO {
  id: string;
  source: string;
  amount: number;
  @Expose({ name: 'createdAt' })
  transformCreatedAtProperty() {
    return this.created_at;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: REPORT_TYPE;

  constructor(partial: Partial<ReportResponseDTO>) {
    Object.assign(this, partial);
  }
}
