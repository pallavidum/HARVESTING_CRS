import { ServerResponse } from './server-response.interface';

export interface Claims {
  userId: string;
  actions: Action[];
}
export interface Action {
  name: string;
  isAllowed: boolean;
}
export interface ResourceActionAccess {
  chatEntity: Claims;
  cityEntity: Claims;
  claimEntity: Claims;
  clientEntity: Claims;
  companyEntity: Claims;
  fileUploadEntity: Claims;
  mailEntity: Claims;
  managerEntity: Claims;
  recruiterEntity: Claims;
  requirementEntity: Claims;
  roleEntity: Claims;
  skillEntity: Claims;
  stateEntity: Claims;
  submissionEntity: Claims;
  superAdminEntity: Claims;
  userEntity: Claims;
}

export interface ClaimsServerGetResponse extends ServerResponse {
  data: ResourceActionAccess;
}
