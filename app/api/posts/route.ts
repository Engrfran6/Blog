// app/api/route.ts
import {handlePOST} from '@/lib/api-handlers/create';
import {handleGET} from '@/lib/api-handlers/get';
import {NextRequest} from 'next/server';

export async function GET() {
  return handleGET();
}

export async function POST(req: NextRequest) {
  return handlePOST(req);
}
