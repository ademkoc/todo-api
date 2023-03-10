import { z } from 'zod';

export const ParamId = z.object({ id: z.coerce.number() });
