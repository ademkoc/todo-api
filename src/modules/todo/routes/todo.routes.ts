import { Router } from 'oak';

import { destroy, index, show, store, update } from '../controllers/todo.controller.ts';
import { validateRequest } from '../../../middlewares/index.ts';
import { ContextState } from '../../../infrastructure/index.ts';
import { CREATE_TODO_SCHEMA, ID_PARAM, UPDATE_TODO_SCHEMA } from '../../../schemas/index.ts';

const router = new Router<ContextState>();

router
    .get('/todo', index)
    .post('/todo', validateRequest({ body: CREATE_TODO_SCHEMA }), store)
    .all('/todo/:id', validateRequest({ params: ID_PARAM }))
    .get('/todo/:id', show)
    .put('/todo/:id', validateRequest({ body: UPDATE_TODO_SCHEMA }), update)
    .delete('/todo/:id', destroy);

export default router;
