import { z } from 'zod';

export const ID_PARAM = z.object({ id: z.coerce.number() });
