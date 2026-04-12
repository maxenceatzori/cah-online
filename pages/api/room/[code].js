import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code || !/^[A-Z0-9]{4,8}$/.test(code.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid room code' });
  }

  const key = `cah:room:${code.toUpperCase()}`;

  try {
    if (req.method === 'GET') {
      const data = await kv.get(key);
      if (!data) return res.status(404).json({ error: 'Room not found' });
      return res.json(data);
    }

    if (req.method === 'POST') {
      const state = req.body;
      // 24-hour TTL — rooms auto-expire
      await kv.set(key, state, { ex: 60 * 60 * 24 });
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await kv.del(key);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end();
  } catch (err) {
    console.error('KV error:', err);
    return res.status(500).json({
      error: 'Storage unavailable. Make sure Vercel KV is set up — see README.',
    });
  }
}
