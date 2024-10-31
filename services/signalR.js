// src/services/signalRService.js
import * as signalR from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection(hubUrl) {
    console.log('startConnection', hubUrl);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      console.log('SignalR Connected.');
    } catch (err) {
      console.error('Error while starting connection: ' + err);
      setTimeout(() => this.startConnection(hubUrl), 5000);
    }
  }

  addListener(methodName, newMethod) {
    if (this.connection) {
      this.connection.on(methodName, newMethod);
    }
  }

  removeListener(methodName, method) {
    if (this.connection) {
      this.connection.off(methodName, method);
    }
  }

  async sendMessage(methodName, ...args) {
    if (this.connection) {
      try {
        await this.connection.invoke(methodName, ...args);
      } catch (err) {
        console.error('Error while sending message: ' + err);
      }
    }
  }

  stopConnection() {
    if (this.connection) {
      this.connection.stop();
      console.log('SignalR Disconnected.');
    }
  }
}

export default new SignalRService();
