import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(request.body);
}
