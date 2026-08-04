# @pipeworx/newsapi

[NewsAPI.org](https://newsapi.org/docs) MCP — global news headlines + archive search. Free dev tier 100 req/day.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Auth

- Platform: `PLATFORM_NEWSAPI_KEY`. BYO: `?_apiKey=…`.

## Tools

- `top_headlines(country?, category?, sources?, q?, pageSize?, page?)` — current top headlines
- `everything(q?, qInTitle?, sources?, domains?, excludeDomains?, from?, to?, language?, sortBy?, pageSize?, page?)` — archive search
- `sources(category?, language?, country?)` — news sources

## Data source

`https://newsapi.org/v2`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "newsapi": {
      "url": "https://gateway.pipeworx.io/newsapi/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Newsapi data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
