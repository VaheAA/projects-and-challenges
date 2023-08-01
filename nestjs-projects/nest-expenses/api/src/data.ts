export interface IData {
  report: IReport[];
}

export interface IReport {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: REPORT_TYPE;
}

export enum REPORT_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export const data: IData = {
  report: [
    {
      id: '1',
      source: 'My shop',
      amount: 23242,
      created_at: new Date(),
      updated_at: new Date(),
      type: REPORT_TYPE.INCOME
    },
    {
      id: '2',
      source: 'My business',
      amount: 43423424,
      created_at: new Date(),
      updated_at: new Date(),
      type: REPORT_TYPE.INCOME
    },
    {
      id: '3',
      source: 'University',
      amount: 3243242,
      created_at: new Date(),
      updated_at: new Date(),
      type: REPORT_TYPE.EXPENSE
    }
  ]
};
