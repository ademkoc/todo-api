import { Router } from 'oak';

import { destroy, index, show, store, update } from '../controllers/todo.controller.ts';
import { validateRequest } from '../../../middlewares/index.ts';
import { ContextState } from '../../../infrastructure/index.ts';
import { NewTodo, ParamId, UpdateTodo } from '../../../schemas/index.ts';

const router = new Router<ContextState>();

router
    .get('/todo', index)
    .post('/todo', validateRequest({ body: NewTodo }), store)
    .all('/todo/:id', validateRequest({ params: ParamId }))
    .get('/todo/:id', show)
    .put('/todo/:id', validateRequest({ body: UpdateTodo }), update)
    .delete('/todo/:id', destroy);

export default router;
