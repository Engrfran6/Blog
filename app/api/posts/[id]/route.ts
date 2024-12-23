// app/api/[id]/route.ts

import {handleDELETE} from '@/lib/api-handlers/delete';
import {handlePUT} from '@/lib/api-handlers/update';

export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}) {
  const id = (await params).id;
  const body = await req.json();

  return handlePUT({body}, {id});
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {
  const id = (await params).id;

  console.log('testing delete id', (await params).id);

  return handleDELETE({id});
}
