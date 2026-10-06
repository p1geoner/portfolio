import type { TProject } from '@/entities/project';

import { admissionCollegeProject } from './admission-college';
import { admissionUniversityProject } from './admission-university';
import { courseConstructorProject } from './course-constructor';
import { coursePlayerProject } from './course-player';
import { gptAdminProject } from './gpt-admin';
import { gptAssistantProject } from './gpt-assistant';
import { housingAdminProject } from './housing-admin';
import { domDoctorProject } from './domdoctor';
import { instudyMarketplaceProject } from './instudy-marketplace';
import { instudyPlatformProject } from './instudy-platform';
import { longreadLibraryProject } from './longread-library';
import { navigatorAdminProject } from './navigator-admin';
import { navigatorCareerProject } from './navigator-career';
import { parsingCarsProject } from './parsing-cars';
import { sakhalinHousingProject } from './sakhalin-housing';
import { stolotoGamesProject } from './stoloto-games';

/**
 * Реестр проектов. Чтобы добавить новый кейс: создать файл рядом,
 * описать объект по образцу и добавить его в этот массив.
 * Порядок в выдаче задаётся полем order, а не позицией в массиве.
 */
export const projectsConfig = [
  navigatorCareerProject,
  sakhalinHousingProject,
  courseConstructorProject,
  longreadLibraryProject,
  instudyPlatformProject,
  gptAssistantProject,
  instudyMarketplaceProject,
  coursePlayerProject,
  gptAdminProject,
  admissionUniversityProject,
  admissionCollegeProject,
  navigatorAdminProject,
  housingAdminProject,
  domDoctorProject,
  parsingCarsProject,
  stolotoGamesProject,
] satisfies TProject[];
