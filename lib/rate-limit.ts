type Bucket = { count: number; resetAt: number };

const windows = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = windows.get(key);

  if (!current || now > current.resetAt) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0, retryAfterMs: current.resetAt - now };
  }

  current.count += 1;
  return { success: true, remaining: limit - current.count };
}
