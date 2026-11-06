import { pool } from '../../db.ts';
import { v4 as uuidv4 } from 'uuid'
import dayjs, { type Dayjs } from 'dayjs';
import axios from 'axios';

/**
 * Creates table row from Github webhook event.
 * @function handleWebhook
 * @param {string} params.eventId - Id of webhook event 
 * @param {any} params.payload - Payload from Github webhook event
 */
export const handleWebhook = async ({ eventId, payload }: { eventId: string, payload: any }) => {
    try {
        const result = await pool.query(`
        INSERT INTO "webhook_events" (id, repository_id, payload, source, event_id, received_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
            [uuidv4(), payload['repository']['id'], payload, 'github', eventId, dayjs(new Date())]
        )
        const createdEvent = result.rows[0]
        return createdEvent
    } catch (err) {
        console.error(err);
        throw err;
    }
};
