import { z } from 'zod';

const labelSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const PullRequestSchema = z.object({
    id: z.int(),
    title: z.string(),
    body: z.string().optional(),
    labels: z.array(labelSchema),
});

export type PullRequest = z.infer<typeof PullRequestSchema>;
