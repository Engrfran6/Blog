// app/api/route.ts
import {handlePOST} from '@/lib/api-handlers/create';
import {handleGET} from '@/lib/api-handlers/get';

export async function GET() {
  return handleGET();
}

export async function POST(req: Request) {
  return handlePOST(req);
}
