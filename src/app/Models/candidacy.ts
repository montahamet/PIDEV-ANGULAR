import { StatusCandidacy } from "./status-candidacy";

export class Candidacy {
    candidacy_id!: number;
    cv!:string;
    coverLetter!:string;
    submissionDate!:Date;
    candidacystatus!:StatusCandidacy;

}
