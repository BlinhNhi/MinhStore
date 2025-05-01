import * as signalR from "@microsoft/signalr";


export const createConnection = (hubEndpoint) => {
    return new signalR.HubConnectionBuilder()
        .withUrl(hubEndpoint)
        .withAutomaticReconnect()
        .build();
};