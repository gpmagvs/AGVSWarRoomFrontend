export class VersionInfo {
  constructor() {
    this.Name = "";
    this.Version = ""
  }
}


export class AGVSFieldVersionInfo extends VersionInfo {
  constructor() {
    super();
    this.floor = 0;
    let vehicleVersionInfo = new VersionInfo();
    this.vehiclesVersions = [];
    this.vehiclesVersions.push(vehicleVersionInfo);
  }
}


