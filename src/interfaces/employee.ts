export interface IEmployee {
  readonly id: string;
  readonly userId: string;
  readonly companyId: string;
  readonly phone: string;
  readonly emailAddress: string;
  readonly jobTitle: string;
  readonly isAdmin: boolean;
  readonly createdDateTime: number;
  readonly updatedDateTime: number;
  readonly isArchived: boolean;
}
