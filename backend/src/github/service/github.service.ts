import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import dayjs, { type Dayjs } from 'dayjs';

/**
 * Creates table row from Github webhook event.
 * @function handleWebhook
 * @param {string} eventId - Id of webhook event 
 * @param {any} payload - Payload from Github webhook event
 */
export const handleWebhook = async ({ eventId, payload }: { eventId: string | undefined, payload: any }) => {
    try {
        const result = await pool.query(`
        INSERT INTO "webhook_events" (project_id, payload, source, event_id, received_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
            [uuidv4(), payload, 'github', eventId, dayjs(new Date())]
        )
        const createdEvent = result.rows[0]
        return createdEvent
    } catch (err) {
        console.error(err);
        throw err;
    }
};
