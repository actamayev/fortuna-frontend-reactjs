# src/classes Directory

This directory contains singleton HTTP client classes used throughout the application.

## Files

### fortuna-http-client.ts

Wrapper around Axios for making authenticated HTTP requests to the backend API.

**Key Features:**
- Extends Axios with a base URL and default headers
- Manages access token via getter/setter
- Request interceptor that automatically adds Authorization header
- Supports "No-Auth-Required" header to bypass auth for certain requests
- Throws error if access token is required but not set

**Usage Pattern:**
```typescript
const client = new FortunaHttpClient()
client.accessToken = "token123"
// All subsequent requests will include Authorization header
```

**Note:** This is instantiated inside the [FortunaApiClientContext](../contexts/fortuna-api-client-context.tsx) and passed to all data service classes.
