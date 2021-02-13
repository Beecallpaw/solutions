import axios from "axios";

const http = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-type": "application/json"
    }
})

class DataService {
    getAll() {
        return http.get("/posts")
    }

    get(id) {
        return http.get(`/posts/${id}`)
    }

    create(data) {
        return http.post("/posts", data)
    }

    update(id, data) {
        return http.put(`/posts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/posts/${id}`);
    }
}

export default new DataService();