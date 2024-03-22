
export enum ProjectOfferStatus {
  ACCEPTED,
  REJECTED,
  PENDING
}
export class ProjectOffer {
    offer_id!: number;
    projectTitle!: string;
    description!: string;
    postedDate!: Date
    status!: ProjectOfferStatus;

    constructor() {
      this.status = ProjectOfferStatus.PENDING;
    }
}
