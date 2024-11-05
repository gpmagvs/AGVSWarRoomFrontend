<template>
  <div class="bird-view" v-if="isClient">
    <!-- <div class="d-flex justify-content-between">
      <el-button type="primary" @click="test">測試</el-button>
    </div>-->
    <l-map
      style="height: 92%; width: 100%; background-color: rgb(0, 15, 33);"
      :zoom="4"
      :center="[0, 0]"
      :crs="L.CRS.Simple"
      :options="mapOptions"
      @ready="onMapReady"
    >
      <!-- mapReady的用途是: 在mapReady後會createPane, 若在pane還沒create前就渲染, 會導致marker或path無法顯示 -->
      <div class="field-map-pane" v-if="mapReady">
        <l-marker
          v-for="marker in markers"
          :lat-lng="[marker.X, marker.Y]"
          :key="marker.TagNumber"
          :icon="GetMarkerIcon(marker)"
        >
          <l-popup
            :autoClose="false"
            :closeOnClick="false"
          >Tag:{{ marker.TagNumber }}({{ marker.X }},{{ marker.Y }})</l-popup>
        </l-marker>

        <l-marker
          v-for="marker in markers"
          :lat-lng="[marker.X, marker.Y]"
          :key="'text-'+marker.TagNumber"
          :icon="createTextDisplayIcon(marker)"
        >
          <l-popup
            :autoClose="false"
            :closeOnClick="false"
          >Tag:{{ marker.TagNumber }}({{ marker.X }},{{ marker.Y }})</l-popup>
        </l-marker>

        <l-polyline
          v-for="path in pathes"
          :lat-lngs="[path.start, path.end]"
          :key="path.id"
          :options="{ dashArray: path.dashArray, color: path.color ,width:10}"
        ></l-polyline>

        <div class="vehicle-pane" v-if="showVehicle">
          <!-- ----------------車輛 ------------------------------------------------->
          <!-- 車輛ICON -->
          <l-marker
            v-for="vehicle in VehicleStatus"
            :lat-lng="vehicle.coordination"
            :key="vehicle.name"
            :icon="AgvIcon"
            :options="{ pane: 'vehiclePane-icon' }"
          ></l-marker>
          <!-- 車輛名稱 -->
          <l-marker
            v-for="vehicle in VehicleStatus"
            :lat-lng="vehicle.coordination"
            :key="'agv-text-'+vehicle.name"
            :icon="createVehicleDisplayIcon(vehicle)"
            :options="{ pane: 'vehiclePane-icon' }"
          ></l-marker>
          <!-- 貨物 -->
          <l-marker
            v-for="vehicle in VehicleStatus.filter(v => v.cargoStatus.hasCargo)"
            :lat-lng="vehicle.coordination"
            :key="'cargo-'+vehicle.name"
            :icon="GetCargoIcon(vehicle.cargoStatus)"
            :options="{ pane: 'vehiclePane-icon' }"
          ></l-marker>
          <!-- 車子的路線 -->
          <l-polyline
            v-for="vehicle in VehicleStatus"
            :lat-lngs="GetPathLatLng(vehicle.path)"
            :key="'path-'+vehicle.name"
            :options="{ color: GetVehicleColor(vehicle), weight: 8, pane: 'vehiclePane-path' }"
          ></l-polyline>
        </div>

        <!-- Grid lines -->
        <div v-if="showGrid">
          <l-polyline
            v-for="line in gridLines"
            :lat-lngs="line.latLngs"
            :key="line.id"
            :options="{ color: 'gray', weight: 1, dashArray: '5, 5', pane: 'gridPane' }"
          ></l-polyline>
        </div>
      </div>
    </l-map>
  </div>
</template>

<script>
import { clsMap, MapPointModel } from '@/utils/models/map';
export default {
  name: 'BirdView',
  props: {
    showVehicle: {
      type: Boolean,
      required: false,
      default: true
    },
    showGrid: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      isClient: false,
      L: null,
      mapReady: false,
      mapData: new clsMap(),
      vehicleColorMap: [
        'lime',//green
        'rgb(255, 105, 180)',  // hot pink
        'orange',
        'yellow', //yellow
        'rgb(0, 105, 255)', //blue
        'rgb(255, 33, 0)', //red
        'rgb(158, 0, 230)', //purple
        'brown'
      ],
      mapOptions: {
      },
      NormalPathPtIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div style="background-color: white; border:2px solid grey; width: 10px; height: 10px; border-radius: 50%;"></div>',
        iconSize: [10, 10]
      }),
      VirtualPathPtIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div style="background-color: grey; width: 10px; height: 10px; border-radius: 50%;"></div>',
        iconSize: [10, 10]
      }),
      WorkPathPtIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div style="background-color: lime; width: 10px; height: 10px; border-radius: 50%; background-image: url("static/GPM_Logo.png")"></div>',
        iconSize: [10, 10]
      }),
      AgvIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div class="agv-icon"> <img src="/agv-icon.png" height="70" alt="AGV Icon" /></div>',
        iconSize: [70, 70],
        iconAnchor: [35, 55]
      }),
      TrayIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div class=""> <img src="/images/tray.png" height="70" alt="tray Icon" /></div>',
        iconSize: [70, 70],
        iconAnchor: [66, 70]
      }),
      RackIcon: L.divIcon({
        className: 'custom-icon',
        html: '<div class=""> <img src="/images/rack.png" height="40" alt="rack Icon" /> </div>',
        iconSize: [40, 40],
        iconAnchor: [10, 40]
      }),
      VehicleStatus: [//mock data first
        {
          name: 'AGV_001',
          coordination: [-1.96, -5.674],
          path: [],
          cargoStatus: {
            hasCargo: true,
            cargoType: 'Tray',
            id: 'TAE1423299'
          }
        },
        {
          name: 'AGV_002',
          coordination: [-2.919, -7.595],
          path: [],
          cargoStatus: {
            hasCargo: false,
            cargoType: '',
            id: ''
          }
        },
        {
          name: 'AGV_003',
          coordination: [2.838, 1.565],
          path: [],
          cargoStatus: {
            hasCargo: false,
            cargoType: '',
            id: ''
          }
        }
      ],
      gridLines: []
    };
  },
  computed: {
    markers() {
      return this.mapData.GetMarkers();
    },
    pathes() {
      return this.mapData.GetPathes();
    }
  },
  methods: {
    test() {
      // let i = 0;
      // setInterval(() => {
      //  this.VehicleStatus[1].path.shift();
      // }, 1000);

      this.VehicleStatus[1].cargoStatus.hasCargo = !this.VehicleStatus[1].cargoStatus.hasCargo;

    },
    GetVehicleColor(vehicle) {
      const index = this.VehicleStatus.findIndex(v => v.name === vehicle.name);
      return this.vehicleColorMap[index];
    },
    onMapReady(map) {
      console.info(map);
      map.createPane('vehiclePane-icon');
      map.getPane('vehiclePane-icon').style.zIndex = 660; // Higher z-index
      map.createPane('vehiclePane-path');
      map.getPane('vehiclePane-path').style.zIndex = 650; // Higher z-index

      map.createPane('fieldMapPane');
      map.getPane('fieldMapPane').style.zIndex = 600; // Lower z-index
      this.createGridLines(map);

      map.createPane('gridPane');
      map.getPane('gridPane').style.zIndex = 100; // Lower z-index

      this.mapReady = true;
    },
    GetMarkerIcon(marker = new MapPointModel()) {
      if (marker.IsVirtualPoint) {
        return this.VirtualPathPtIcon;
      }
      if (marker.StationType === 0) {
        return this.NormalPathPtIcon;
      }
      else {
        return this.WorkPathPtIcon;
      }
    },
    createTextDisplayIcon(marker = new MapPointModel()) {

      const isEq = marker.StationType !== 0;
      var label = isEq ? 'text-label-eq' : 'text-label';
      return L.divIcon({
        className: 'custom-icon',
        html: `<label class="${label}">${marker.Graph.Display}</label>`,
        iconSize: [64, 64], // Adjust size as needed
        iconAnchor: [15, -5] // Adjust anchor to position the label correctly
      });
    },
    createVehicleDisplayIcon(vehicle = { name: '', coordination: [0, 0], icon: null, cargoStatus: { hasCargo: false, cargoType: '', id: '' } }) {
      var className = vehicle.cargoStatus.id !== '' ? "agv-text-label-with-cargo" : "agv-text-label";
      return L.divIcon({
        className: 'custom-icon',
        html: `<div class="${className}" > <div class="cargo-id">${vehicle.cargoStatus.id} <div class="vehicle-text-label"> ${vehicle.name}</div> </div>`,
        iconSize: [64, 120],
        iconAnchor: [40, 110]
      });
    },
    GetCargoIcon(cargoStatus = { hasCargo: false, cargoType: '' }) {
      if (!cargoStatus.hasCargo) {
        return null;
      }
      if (cargoStatus.cargoType === 'Tray') {
        return this.TrayIcon;
      }
      return this.RackIcon;
    },

    GetPathLatLng(path = []) {
      var _getCoordinationOfTag = (tag) => {
        const pt = Object.values(this.mapData.Points).find(p => p.TagNumber === tag);
        if (pt) {
          return [pt.X, pt.Y];
        }
        return [0, 0];
      }
      return path.map(p => _getCoordinationOfTag(p));
    },
    /**
     * 繪製格線
     * @param {L.Map} map
     */
    createGridLines(map) {
      const gridSize = 10; // Define the size of each grid cell
      const bounds = map.getBounds();
      const startX = Math.floor(bounds.getWest() / gridSize) * gridSize;
      const endX = Math.ceil(bounds.getEast() / gridSize) * gridSize;
      const startY = Math.floor(bounds.getSouth() / gridSize) * gridSize;
      const endY = Math.ceil(bounds.getNorth() / gridSize) * gridSize;

      // Create vertical lines
      for (let x = startX; x <= endX; x += gridSize) {
        this.gridLines.push({
          id: `x-${x}`,
          latLngs: [[x, startY], [x, endY]]
        });
      }

      // Create horizontal lines
      for (let y = startY; y <= endY; y += gridSize) {
        this.gridLines.push({
          id: `y-${y}`,
          latLngs: [[startX, y], [endX, y]]
        });
      }
    }
  },
  mounted() {
    import('leaflet').then((module) => {
      this.L = module;

      if (process.env.NODE_ENV === 'development') {
        //mock data
        this.$store.dispatch('map/getTestMapData').then(() => {
          this.mapData = this.$store.getters['map/getMapData']('test');
          console.info(this.mapData);
        });
      }
      this.isClient = true;
    });
  },
};
</script>

<style lang="scss" scoped>
.bird-view {
  height: 100%;
  .custom-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .text-label,
  ::v-deep .text-label-eq {
    color: grey;
    font-size: 14px;
    width: 75px;
    font-weight: bold;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }

  ::v-deep .text-label-eq {
    width: auto;
    background-color: rgba(226, 226, 226, 0.373);
    color: gold;
    border-radius: 8px;
    padding: 2px 8px;
    &:hover {
      color: black;
    }
  }
  ::v-deep .vehicle-text-label {
    background-color: rgba(0, 195, 255, 0.87);
    font-size: 14px;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
  }
  ::v-deep .cargo-id {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .agv-text-label-with-cargo,
  ::v-deep .agv-text-label {
    width: 80px;
  }

  ::v-deep .agv-text-label {
    position: relative;
    bottom: -30px;
  }
}
</style>
