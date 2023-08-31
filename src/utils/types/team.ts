import type { User } from './user';

export interface TeamDetails {
  id: number;
  company_name: string;
  company_logo: string;
  is_active: boolean;
  created: string;
  slug: string;
}

export interface Team {
  id: number;
  organization: TeamDetails;
  is_organization_user: boolean;
  is_my_team: boolean;
  default_organisation: boolean;
  added: string;
  users_count: number;
  invited_by: User;
}
