import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code || !/^[A-Z0-9]{4,8}$/.test(code.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid room code' });
  }

  const key = `cah:room:${code.toUpperCase()}`;

  try {
    if (req.method === 'GET') {
      const data = await redis.get(key);
      if (!data) return res.status(404).json({ error: 'Room not found' });
      return res.json(data);
    }

    if (req.method === 'POST') {
      await redis.set(key, req.body, { ex: 60 * 60 * 24 });
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await redis.del(key);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end();
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).json({ error: err.message });
  }
}
