import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const REPOS = {
  free: {
    token: () => process.env.INSTALL_TOKEN,
    url: 'github.com/ehoyos007/operators-academy-setup.git',
    path: '~/.local/share/operators-academy',
    tierRequired: null,
  },
  premium: {
    token: () => process.env.PRO_INSTALL_TOKEN,
    url: 'github.com/ehoyos007/operators-academy-pro.git',
    path: '~/.local/share/operators-academy-pro',
    tierRequired: 'premium',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { repo } = req.query;
  const config = REPOS[repo];

  if (!config) {
    return res.status(400).json({ error: "Invalid repo. Use 'free' or 'premium'." });
  }

  // Verify auth
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const jwt = auth.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(jwt);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  // Check tier
  if (config.tierRequired) {
    const tier = user.user_metadata?.tier || 'free';
    if (tier !== config.tierRequired) {
      return res.status(403).json({ error: 'Premium subscription required' });
    }
  }

  // Build clone command
  const token = config.token();
  if (!token) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const cloneCommand = `git clone https://${token}@${config.url} ${config.path}`;

  return res.status(200).json({ cloneCommand });
}
