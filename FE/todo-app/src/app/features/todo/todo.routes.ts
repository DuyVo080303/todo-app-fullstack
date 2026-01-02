import { Routes } from "@angular/router";
import { TodoPageComponent } from "./pages/todo-page/todo-page.component";

export const TODO_ROUTES: Routes = [
    { path: '', component: TodoPageComponent },                   // /todo_list
    { path: ':listId', component: TodoPageComponent },            // /todo_list/2
    { path: ':listId/items', component: TodoPageComponent },      // /todo_list/2/items
];

