export class clsMap {
  constructor() {
    this.Version = 1;
    this.Name = "";
    this.Options = new clsMapOptions();
    this.Note = '';
    this.PointIndex = 0;
    this.Map_Image_Size = [400, 400];
    this.Map_Image_Boundary = [-20, -20, 20, 20];
    this.Points = {
      0: new MapPointModel()
    };
    this.BezierCurves = {};
    this.Pathes = [];
    this.Segments = [];
    this.Bays = {};
    this.Regions = [new MapRegion()]
  }
  GetMarkers() {
    return Object.values(this.Points);
  }
  GetPathes() {
    return this.Segments.map(s => {
      return {
        start: s.StartCoordination,
        end: s.EndCoordination,
        id: s.PathID,
        dashArray: s.IsEQLink ? '5,20' : null,
        color: 'grey'
      }
    });
  }
}
export class MapPointModel {
  constructor() {
    this.X = 0;
    this.Y = 0;
    this.Name = ""
    this.TagNumber = 0
    this.Direction = 0
    this.Direction_Avoid = 0
    this.Direction_Secondary_Point = 0 //二次定位點的停車角度
    this.UseAvoidThetaWhenStopAtWaitingPointOfEntryRegion = false;
    this.AGV_Alarm = false;
    this.Enable = true;
    this.IsStandbyPoint = false;
    this.IsSegment = false
    this.IsOverlap = false
    this.IsParking = false
    this.IsAvoid = false;
    this.IsVirtualPoint = false;
    this.IsAutoDoor = false
    this.IsExtinguishing = false
    this.InvolvePoint = ""
    this.StationType = 0
    this.LsrMode = 1
    this.Speed = 1
    this.Bay = ""
    this.Graph = {
      Display: "",
      X: 0,
      Y: 0,
      ImageName: '',
      ImageScale: 0.45,
      ImageSize: [64, 64],
      IsBezierCurvePoint: false,
      BezierCurveID: '',
      textOffsetX: 0,
      textOffsetY: -22
    }
    this.Target = {

    }
    this.DodgeMode = 0
    this.SpinMode = 0
    this.SubMap = ""
    this.AutoDoor = {
      KeyName: "",
      KeyPassword: ""
    }
    this.MotionInfo = {
      ControlBypass: {
        GroundHoleCCD: "",
        GroundHoleSensor: "",
        UltrasonicSensor: ""

      }
    }
    this.Region = ""
    this.IsCharge = false
    this.IsEquipment = false
    this.IsSTK = false
    this.IsEQLink = false
    this.IsCross = false
    this.IsRegisted = false
    this.IsTrafficCheckPoint = false
    this.RegistInfo = null
  }
}
export class clsMapOptions {
  constructor() {
    this.pathColor = 'rgb(45,42,46)';
    this.normalStationTextColor = 'orange';
    this.workStationTextColor = 'lime';
    this.normalStationTextFontSize = 12;
    this.workStationTextFontSize = 18;
    this.fontSizeOfDisplayName = 12;
    this.fontSizeOfAsCandicates = 16;
    this.Rotation = 0;
    this.EQIcons = [];
    this.gridSize = 1;
    this.gridOffsetX = 0;
    this.gridOffsetY = 0;
    this.defaultShowBackgroudImage = true
  }
}


export class MapRegion {
  constructor(name = "", coordinations = [], region_type = 0 | 1) {
    this.Name = name
    this.PolygonCoordinations = coordinations
    this.RegionType = region_type
    this.IsOpend = true
    this.IsNarrowPath = true
    this.MaxVehicleCapacity = 2
    this.SpeedLimit = 1
    this.EnteryTags = []
    this.LeavingTags = []
    this.ThetaLimitWhenAGVIdling = 0
  }
}
