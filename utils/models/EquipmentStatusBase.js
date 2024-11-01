class EquipmentStatusBase {
  constructor() {
    this.Name = "";
    this.Description = "";
    this.Connected = false;
    this.Tag = 0;
    this.Status = EquipmentStatusBase.RUN_STATUS.IDLE;
  }

  static RUN_STATUS = {
    IDLE: 'IDLE',
    RUN: 'RUN',
    DOWN: 'DOWN'
  };
}

export default EquipmentStatusBase;
