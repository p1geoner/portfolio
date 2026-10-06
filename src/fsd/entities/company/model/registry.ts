import { companiesConfig } from '@content/config/companies.config';

import { parseConfig } from '@/shared/content';

import { type TCompany, companiesSchema } from './schema';

const companies: readonly TCompany[] = parseConfig(
  companiesSchema,
  companiesConfig,
  'content/config/companies.config'
);

const companiesById = new Map(
  companies.map((company) => [company.id, company])
);

export const getCompanies = (): readonly TCompany[] => companies;

export const getCompanyById = (id: string): TCompany | null =>
  companiesById.get(id) ?? null;
