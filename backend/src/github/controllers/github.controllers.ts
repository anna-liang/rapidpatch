import type { Request, Response } from 'express';
import * as githubService from '../service/github.service.ts'

export const webhook = async (req: Request, res: Response) => {
    const payload = req.body
    const eventId = Array.isArray(req.headers['x-github-delivery']) ? req.headers['x-github-delivery'][0] : req.headers['x-github-delivery'] || ''
    console.log(eventId)
    if (!eventId || !payload) {
        return res.status(400).send({ error: 'Invalid payload' });
    }
    try {
        await githubService.handleWebhook({ eventId, payload })
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
    res.status(200).send({ message: 'Valid payload' });
};