import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

    {
        path: '',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },

    {
        path: 'todo_list',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/todo/todo.routes').then(m => m.TODO_ROUTES),
    },

    { path: '**', redirectTo: 'login' },
];
