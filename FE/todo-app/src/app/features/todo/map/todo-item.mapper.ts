// mapper.ts
import { PriorityApi, PriorityUi, TodoItem, TodoItemApi } from '../models';

export function mapPriorityApiToUi(p: PriorityApi): PriorityUi {
    switch (p) {
        case 'LOW':
            return 'Low';
        case 'MEDIUM':
            return 'Medium';
        case 'HIGH':
            return 'High';
    }
}

export function mapTodoItemApiToUi(api: TodoItemApi): TodoItem {
    return {
        id: api.id,
        title: api.title,
        dueDate: api.dueDate,
        completed: api.completed,
        priority: mapPriorityApiToUi(api.priority),
        listId: api.listId,
    };
}
