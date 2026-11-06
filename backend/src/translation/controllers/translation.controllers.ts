import type { Request, Response } from 'express';
import * as translationService from '../services/translation.services.ts'

export const translate = async (req: Request, res: Response) => {
    // should get ID (PR id or db id?)
    const { projectId, repositoryPullRequestMap } = req.body
    // if (!req.user) {
    //     return res.status(401).json({ error: 'Unauthorized Access' });
    // }
    if (!projectId) {
        return res.status(400).json({ error: 'Missing parameter "projectId"' });
    }
    if (!repositoryPullRequestMap) {
        return res.status(400).json({ error: 'Missing parameter "repositoryPullRequestMap"' });
    }
    try {
        await translationService.translate({ projectId, repositoryPullRequestMap })
    } catch (err: any) {
        return res.status(err.status || 500).json({ error: err.message });
    }
    res.status(200).send({ message: 'Valid payload' });
};