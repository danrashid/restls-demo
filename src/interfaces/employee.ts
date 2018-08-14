import { IUser } from './user';

export interface IEmployeePayload {
  readonly id: string;
  readonly userId: string;
  readonly companyId: string;
  readonly phone: string;
  readonly emailAddress: string;
  readonly jobTitle?: string;
  readonly comments?: string;
  readonly isAdmin: boolean;
  readonly created: number;
  readonly updated: number;
  readonly isArchived: boolean;
}

export interface IEmployee extends IEmployeePayload {
  readonly user: IUser;
}
