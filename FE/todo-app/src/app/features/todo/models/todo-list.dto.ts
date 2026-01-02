export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface TodoListApi {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    userId: number;
}

export interface TodoList {
    id: number;
    name: string;
    count: number;
}
