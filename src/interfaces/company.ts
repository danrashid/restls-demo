export interface ICompany {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly createdDateTime: number;
  readonly updatedDateTime: number;
  readonly isArchived: boolean;
  numEmployees: number;
}
