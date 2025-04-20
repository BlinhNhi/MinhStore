import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7234/commentHub") // Thay URL nếu khác
    .withAutomaticReconnect()
    .build();


export default connection;