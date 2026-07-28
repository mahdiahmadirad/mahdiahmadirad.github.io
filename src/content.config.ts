import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import {
  articleSchema,
  pageSchema,
  projectSchema,
  topicSchema,
} from './content/schemas';

const markdownId = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/u, '');

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
    generateId: markdownId,
  }),
  schema: articleSchema,
});

const topics = defineCollection({
  loader: glob({
    base: './src/content/topics',
    pattern: '**/*.md',
    generateId: markdownId,
  }),
  schema: topicSchema,
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.md',
    generateId: markdownId,
  }),
  schema: projectSchema,
});

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
    generateId: markdownId,
  }),
  schema: pageSchema,
});

export const collections = { articles, topics, projects, pages };
