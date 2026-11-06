import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import dayjs, { type Dayjs } from 'dayjs';
import { generateText } from 'ai';
import { PullRequestSchema } from '../models/translations.models.ts';

/**
 * 
 * @function translate
 * @param {string} params.projectId - 
 * @param {string} params.repositoryPullRequestMap - Map of repositoryIds to pullRequestIds within that repository
 */
export const translate = async ({ projectId, repositoryPullRequestMap }: { projectId: string, repositoryPullRequestMap: { repositoryId: { pullRequestId: string[] } } }) => {
    try {
        // Find pull request in `webhook_events` and feed payload param to translator
        const result = await pool.query(`
            SELECT payload FROM "webhook_events"
            WHERE project_id = $1, payload->'pull_request'->>'id' = '$2';
            `,
            [projectId, pullRequestId]
        )
        const payload = PullRequestSchema.parse(result.rows[0])
        // const { text } = await generateText({
        //     model: '',
        //     prompt: '',
        // });
        // console.log(text)
        // const result = await pool.query(`
        // INSERT INTO "translations" (id, pull_request_id, title, body, labels, created_at)
        // VALUES ($1, $2, $3, $4, $5, $6)
        // RETURNING *;`,
        //     [uuidv4(), id, title, body, labels, dayjs(new Date())]
        // )
        // const createdEvent = result.rows[0]
        // return createdEvent
    } catch (err) {
        console.error(err);
        throw err;
    }
};
