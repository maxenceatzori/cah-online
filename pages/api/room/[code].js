import Redis from 'ioredis';

let _redis;
function getRedis() {
  if (!_redis) {
    const url = process.env.REDIS_URL;
    _redis = new Redis(url, {
      // Only use TLS for rediss:// URLs
      tls: url?.startsWith('rediss://') ? {} : undefined,
      maxRetriesPerRequest: 3,
      connectTimeout: 10000,
    });
    _redis.on('error', (err) => console.error('Redis error:', err));
  }
  return _redis;
}

const kv = {
  get: async (key) => {
    const val = await getRedis().get(key);
    return val ? JSON.parse(val) : null;
  },
  set: async (key, value, opts) => {
    if (opts?.ex) {
      await getRedis().set(key, JSON.stringify(value), 'EX', opts.ex);
    } else {
      await getRedis().set(key, JSON.stringify(value));
    }
  },
  del: async (key) => getRedis().del(key),
};

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
    console.error('Redis error:', err);
    return res.status(500).json({ error: err.message });
  }
}
