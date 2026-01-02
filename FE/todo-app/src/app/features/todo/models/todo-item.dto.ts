export type PriorityApi = 'HIGH' | 'MEDIUM' | 'LOW';
export type PriorityUi = 'High' | 'Medium' | 'Low';


export interface TodoItem {
    id: number;
    title: string;
    dueDate: string | Date;      
    priority: PriorityUi;
    completed?: boolean;
};

export interface TodoItemApi {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    priority: PriorityApi
    completed: boolean;
    dueDate: string; 
    listId: number;
}