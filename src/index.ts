interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * NewsAPI.org MCP.
 */


const BASE = 'https://newsapi.org/v2';
const UA = 'pipeworx-mcp-newsapi/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'top_headlines',
    description: 'Current top headlines.',
    inputSchema: {
      type: 'object',
      properties: { country: { type: 'string' }, category: { type: 'string' }, sources: { type: 'string' }, q: { type: 'string' }, pageSize: { type: 'number' }, page: { type: 'number' } },
    },
  },
  {
    name: 'everything',
    description: 'Archive search.',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string' },
        qInTitle: { type: 'string' },
        sources: { type: 'string' },
        domains: { type: 'string' },
        excludeDomains: { type: 'string' },
        from: { type: 'string' },
        to: { type: 'string' },
        language: { type: 'string' },
        sortBy: { type: 'string' },
        pageSize: { type: 'number' },
        page: { type: 'number' },
      },
    },
  },
  { name: 'sources', description: 'News sources.', inputSchema: { type: 'object', properties: { category: { type: 'string' }, language: { type: 'string' }, country: { type: 'string' } } } },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = (args._apiKey as string | undefined)?.trim();
  if (!apiKey) throw new Error('NewsAPI requires an API key. Set PLATFORM_NEWSAPI_KEY or pass ?_apiKey=… (free at https://newsapi.org/register).');
  const get = async (path: string, params?: Record<string, unknown>) => {
    const p = new URLSearchParams();
    if (params) for (const [k, v] of Object.entries(params)) if (k !== '_apiKey' && v != null) p.set(k, String(v));
    const res = await fetch(`${BASE}${path}?${p}`, { headers: { Accept: 'application/json', 'User-Agent': UA, 'X-Api-Key': apiKey } });
    if (res.status === 401 || res.status === 403) throw new Error('NewsAPI: invalid API key.');
    if (res.status === 429) throw new Error('NewsAPI: 429 rate limit (free tier 100/day).');
    if (!res.ok) throw new Error(`NewsAPI: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'top_headlines':
      return get('/top-headlines', args);
    case 'everything':
      return get('/everything', args);
    case 'sources':
      return get('/top-headlines/sources', args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
