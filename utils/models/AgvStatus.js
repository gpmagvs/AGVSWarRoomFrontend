import EquipmentStatusBase from './EquipmentStatusBase';

class AgvStatus extends EquipmentStatusBase {
  constructor() {
    super();
    this.OnlineState = 'OFFLINE';
    // 電池
    this.BatLevel = 0;
    this.BatVoltage = 0;
    this.BatChargeCurrent = 0;
    this.BatDisChargeCurrent = 0;

    // 左輪馬達
    this.MotorRightVoltage = 0;
    this.MotorRightCurrent = 0;
    this.MotorRightTemperature = 0;
    this.MotorRightAlarmCode = 0;

    // 右輪馬達
    this.MotorLeftVoltage = 0;
    this.MotorLeftCurrent = 0;
    this.MotorLeftTemperature = 0;
    this.MotorLeftAlarmCode = 0;

    this.RunningTask = new RunningTaskState();
    this.DailyTaskStatistics = new DailyTaskExecuteStatistics();
    this.Alarm = new AlarmState();
    this.UtilizationViewData = new UtilizationViewData();
  }
}

class RunningTaskState {
  constructor() {
    this.TaskID = '';
    this.TaskType = '';
    this.FromStationName = '';
    this.ToStationName = '';
  }
}

class DailyTaskExecuteStatistics {
  constructor() {
    this.TotalTaskNum = 0;
    this.TransferTaskNum = 0;
    this.ChargeTaskNum = 0;
    this.TotalSuccessNum = 0;
    this.TotalFailureNum = 0;
    this.SuccessRate = 0;
  }
}

class AlarmState {
  constructor() {
    this.CurrentAlarms = [new Alarm()];
  }
}


class Alarm {
  constructor() {
    this.Time = new Date();
    this.AlarmCode = 0;
    this.AlarmType = '';
    this.AlarmMessage = '';
  }
}


class UtilizationViewData {
  constructor() {
    this.data = []
  }
}


export default AgvStatus;
