import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  const url = process.env.redis2_KV_REST_API_URL;
  const token = process.env.redis2_KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(200).json({
      ok: false,
      issue: 'Missing env vars',
      hasUrl: !!url,
      hasToken: !!token,
    });
  }

  try {
    const redis = new Redis({ url, token });
    await redis.set('ping', 'pong', { ex: 10 });
    const val = await redis.get('ping');
    return res.status(200).json({ ok: true, response: val });
  } catch (err) {
    return res.status(200).json({ ok: false, issue: err.message });
  }
}
