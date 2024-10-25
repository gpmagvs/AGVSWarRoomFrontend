// services/signalr.js
import * as signalR from '@microsoft/signalr';
import { getCurrentUrl } from './helper';
class SignalRService {
  constructor() {
    this.audio = null
  }
  init(store) {
    var signalRUrl = store.state.SignalRUrl;
    console.info("signalRURL=", signalRUrl);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRUrl) // 替换为你的 SignalR 端点
      .withAutomaticReconnect()
      .build();
    this.store = store;
    this.connection.onreconnected(() => {
      console.log('Reconnected to SignalR server');
    });
    this.connection.onclose(() => {
      console.log('Connection closed');
    });


    // 示例：监听 SignalR 消息并更新 store
    this.connection.on('ReceiveData', (data) => {
      this.store.commit('backend/storeBatteryInfos', data);
    });

    this.connection.on('ChargerStatus', data => {
      this.store.commit('backend/storeChargerInfos', data)
    })


    this.connection.on('AlarmAudio', (state) => {
      console.info('AlarmAudio', state)
      this.store.commit('backend/storeAlarmAudioState', state)
    });

    this.start();
    //this.connectToAllFieldAndListenFieldOverview()

  }
  connectToAllFieldAndListenFieldOverview(store) {
    setTimeout(() => {
      var fields = store.state.fields;
      console.log(fields)

      fields.forEach(async field => {
        var fieldName = field.name;
        var url = field.url;

        var connection = new signalR.HubConnectionBuilder()
          .withUrl(`http://${url}/RealTimeDataHub`) // 替换为你的 SignalR 端点
          .withAutomaticReconnect()
          .build();
        try {
          await connection.start();
          connection.on('FieldOverview', (data) => {
            store.commit('storeFieldOverViewStatus', {
              name: fieldName,
              status: data
            })
          });
        } catch (err) {
          console.log(fieldName, 'Error while starting connection: ' + err);
        }

      });
    }, 1000);

  }

  async start() {
    try {
      await this.connection.start();
      console.log('SignalR Connected.');
    } catch (err) {
      console.log('Error while starting connection: ' + err);
      setTimeout(() => this.start(), 5000);
    }
  }

  playSound() {
    if (!this.audio) {
      this.audio = new Audio('/sounds/alarm.mp3');
      this.audio.loop = true;
    }
    this.audio.play();
  }
  stopSound() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }


  on(event, callback) {
    this.connection.on(event, callback);
  }

  off(event, callback) {
    this.connection.off(event, callback);
  }

  async send(event, data) {
    try {
      await this.connection.invoke(event, data);
    } catch (err) {
      console.error('Error sending data: ' + err);
    }
  }
}
export default new SignalRService();
