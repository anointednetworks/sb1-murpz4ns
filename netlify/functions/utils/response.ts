import { APIResponse } from '../../../src/types/api';

export function createResponse(statusCode: number, body: APIResponse) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    body: JSON.stringify(body),
  };
}