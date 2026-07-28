import { z } from 'astro/zod';

const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const localeSchema = z.enum(['fa', 'en']);
const translationKeySchema = z.string().regex(kebabCase);
const slugSchema = z.string().regex(kebabCase);
const sampleSchema = z.boolean().default(false);

const uniqueStrings = (values: string[]) =>
  new Set(values).size === values.length;

export const articleSchema = z
  .object({
    title: z.string().min(8).max(120),
    description: z.string().min(40).max(180),
    lang: localeSchema,
    translationKey: translationKeySchema,
    slug: slugSchema,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z
      .array(translationKeySchema)
      .min(1)
      .refine(uniqueStrings, 'Topics must not contain duplicates.'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    sample: sampleSchema,
    cover: z
      .object({
        src: z.string().min(1),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
    canonicalOverride: z.url().optional(),
    readingTimeOverride: z.number().int().positive().optional(),
  })
  .superRefine(({ publishedAt, updatedAt }, context) => {
    if (updatedAt && updatedAt < publishedAt) {
      context.addIssue({
        code: 'custom',
        message: 'updatedAt must be on or after publishedAt.',
        path: ['updatedAt'],
      });
    }
  });

export const topicSchema = z.object({
  name: z.string().min(2).max(80),
  lang: localeSchema,
  translationKey: translationKeySchema,
  slug: slugSchema,
  description: z.string().min(20).max(180),
  order: z.number().int(),
  sample: sampleSchema,
});

export const projectSchema = z.object({
  name: z.string().min(2).max(100),
  lang: localeSchema,
  translationKey: translationKeySchema,
  slug: slugSchema,
  summary: z.string().min(20).max(220),
  status: z.enum(['active', 'maintained', 'archived', 'concept']),
  order: z.number().int(),
  links: z
    .object({
      repository: z.url().optional(),
      site: z.url().optional(),
    })
    .default({}),
  technologies: z
    .array(z.string().min(1))
    .max(12)
    .refine(uniqueStrings, 'Technologies must not contain duplicates.'),
  featured: z.boolean().default(false),
  sample: sampleSchema,
});

export const pageSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(20).max(180),
  lang: localeSchema,
  translationKey: translationKeySchema,
  slug: slugSchema,
  draft: z.boolean().default(false),
  sample: sampleSchema,
});

export type ArticleData = z.infer<typeof articleSchema>;
export type TopicData = z.infer<typeof topicSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type PageData = z.infer<typeof pageSchema>;
