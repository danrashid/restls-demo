export interface ICompany {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly phone: string;
  readonly created: number;
  readonly updated: number;
  readonly isArchived: boolean;
  numEmployees: number;
}
