import { Injectable } from "@angular/core";
import { environment } from "../../../../../duy";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TodoService {
    private baseUrl = environment.apiUrl + '/todo_list';

    constructor(private http: HttpClient) { }

    getLists() {
        return this.http.get(this.baseUrl);
    }

    createList(data: { name: string }) {
        return this.http.post(this.baseUrl, data);
    }
}
