/**
 * Проверка контента отдельным шагом CI: реестры разбирают конфиги схемами Zod
 * при первом импорте, поэтому достаточно их подтянуть.
 * Дополнительно проверяем связи между конфигами, которые схема одного файла
 * увидеть не может: ссылки проектов на навыки, компании и слайсы опыта.
 */
import { getCompanies } from '../src/fsd/entities/company';
import { getExperience } from '../src/fsd/entities/experience';
import { getProfile } from '../src/fsd/entities/profile';
import { getProjects } from '../src/fsd/entities/project';
import { getSkills } from '../src/fsd/entities/skill';
import { getSiteConfig } from '../src/fsd/shared/config';

const collectCrossReferenceErrors = (): string[] => {
  const errors: string[] = [];

  const projects = getProjects();
  const skillIds = new Set(getSkills().map((skill) => skill.id));
  const companyIds = new Set(getCompanies().map((company) => company.id));
  const projectSlugs = new Set(projects.map((project) => project.slug));

  for (const project of projects) {
    if (!companyIds.has(project.companyId)) {
      errors.push(
        `projects/${project.slug}: неизвестная компания «${project.companyId}»`
      );
    }

    for (const skillId of project.stack) {
      if (!skillIds.has(skillId)) {
        errors.push(
          `projects/${project.slug}: в stack указан неизвестный навык «${skillId}»`
        );
      }
    }
  }

  for (const entry of getExperience()) {
    for (const slug of entry.projectSlugs) {
      if (!projectSlugs.has(slug)) {
        errors.push(
          `experience/${entry.id}: projectSlugs ссылается на несуществующий проект «${slug}»`
        );
      }
    }
  }

  const site = getSiteConfig();

  if (!site.locales.includes(site.defaultLocale)) {
    errors.push('site.config: defaultLocale отсутствует в списке locales');
  }

  return errors;
};

const main = (): void => {
  const profile = getProfile();
  const projects = getProjects();
  const errors = collectCrossReferenceErrors();

  if (errors.length > 0) {
    console.error('Контент не прошёл проверку связей:');
    for (const error of errors) {
      console.error(`  • ${error}`);
    }
    process.exit(1);
  }

  const ndaCount = projects.filter(
    (project) => project.visibility === 'nda'
  ).length;

  console.log('Контент валиден.');
  console.log(`  профиль: ${profile.name.ru}`);
  console.log(`  проектов: ${projects.length} (под NDA: ${ndaCount})`);
  console.log(`  навыков: ${getSkills().length}`);
};

main();
