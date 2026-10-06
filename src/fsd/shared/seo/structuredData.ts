import type {
  BreadcrumbList,
  CreativeWork,
  ItemList,
  Person,
  ProfilePage,
  WebSite,
} from 'schema-dts';

/**
 * Билдеры возвращают объекты без @context: контекст добавляет компонент
 * JsonLd в одном месте. Иначе вложенные сущности (например Person внутри
 * ProfilePage) приходилось бы вручную очищать от лишнего контекста.
 */

export type TPersonSchemaParams = {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  imageUrl: string;
  email?: string;
  sameAs: readonly string[];
  locality: string;
  knowsAbout: readonly string[];
  worksFor?: { name: string; description: string };
};

export const buildPersonSchema = ({
  name,
  jobTitle,
  description,
  url,
  imageUrl,
  email,
  sameAs,
  locality,
  knowsAbout,
  worksFor,
}: TPersonSchemaParams): Person => ({
  '@type': 'Person',
  name,
  jobTitle,
  description,
  url,
  image: imageUrl,
  ...(email === undefined ? {} : { email: `mailto:${email}` }),
  sameAs: [...sameAs],
  address: {
    '@type': 'PostalAddress',
    addressLocality: locality,
  },
  knowsAbout: [...knowsAbout],
  ...(worksFor === undefined
    ? {}
    : {
        worksFor: {
          '@type': 'Organization',
          name: worksFor.name,
          description: worksFor.description,
        },
      }),
});

export const buildProfilePageSchema = (params: {
  url: string;
  name: string;
  description: string;
  person: Person;
}): ProfilePage => ({
  '@type': 'ProfilePage',
  url: params.url,
  name: params.name,
  description: params.description,
  mainEntity: params.person,
});

export const buildWebSiteSchema = (params: {
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  authorName: string;
}): WebSite => ({
  '@type': 'WebSite',
  url: params.url,
  name: params.name,
  description: params.description,
  inLanguage: params.inLanguage,
  author: {
    '@type': 'Person',
    name: params.authorName,
  },
});

export const buildBreadcrumbSchema = (
  items: readonly { name: string; url: string }[]
): BreadcrumbList => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export type TCreativeWorkSchemaParams = {
  name: string;
  description: string;
  url: string;
  authorName: string;
  keywords: readonly string[];
  technologies: readonly string[];
  dateCreated: string;
  imageUrl?: string;
  publisherName?: string;
};

/**
 * Кейс описывается как CreativeWork: он не статья и не товар, поэтому
 * Article или Product были бы неточной разметкой.
 */
export const buildCreativeWorkSchema = ({
  name,
  description,
  url,
  authorName,
  keywords,
  technologies,
  dateCreated,
  imageUrl,
  publisherName,
}: TCreativeWorkSchemaParams): CreativeWork => ({
  '@type': 'CreativeWork',
  name,
  description,
  url,
  dateCreated,
  keywords: [...keywords].join(', '),
  author: {
    '@type': 'Person',
    name: authorName,
  },
  ...(imageUrl === undefined ? {} : { image: imageUrl }),
  ...(publisherName === undefined
    ? {}
    : {
        publisher: {
          '@type': 'Organization',
          name: publisherName,
        },
      }),
  about: technologies.map((technology) => ({
    '@type': 'Thing' as const,
    name: technology,
  })),
});

export const buildItemListSchema = (
  items: readonly { name: string; url: string }[]
): ItemList => ({
  '@type': 'ItemList',
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: item.url,
  })),
});
