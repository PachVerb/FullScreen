/**
 * @param map {Object} 地图实例
 * @param data {Object} 地图geojson 数据
 * @param layername {string} 图层名称
 * @param weight {string} 权重
 * @class HeatLayer
 */
 class HeatLayer {
  constructor(map, data, layername, weight,circlename) {
      this.map = map
      this.data = data
      this.layername = layername
      this.circlename=circlename
      this.sourcename = `${layername}-source`
      this.weight = weight
  }
  addheatData = () => {
      let source = this.map.getSource(this.sourcename)
      if (!source) {
          this.map.addSource(this.sourcename, {
              type: 'geojson',
              data: this.data
          })
      }
      //console.log("11111111",this.data);
      return {
          'id': this.layername,
          'type': 'heatmap',
          'source': this.sourcename,
          'maxzoom': 20,
          'paint': {
              // Increase the heatmap weight based on frequency and property magnitude
              'heatmap-weight': [
                  'interpolate', ['linear'],
                  ['get', this.weight],
                  0, 0,
                  2, 1
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              'heatmap-intensity': [
                  'interpolate', ['linear'],
                  ['zoom'],
                  14, 1,
                  20, 3
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              'heatmap-color': [
                  'interpolate', ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(255,255,255,0)',
                  0.35, 'rgba(25,193,32,0.7)',
                   0.5, 'rgba(43,253,251,0.6)',
                  0.65, 'rgba(236,234,45,0.7)',
                  1, 'rgba(245,73,64,0.7)'
              ],
              // Adjust the heatmap radius by zoom level
              'heatmap-radius': [
                  'interpolate', ['linear'],
                  ['zoom'],
                  14, 5,
                  20, 25
              ],
              // Transition from heatmap to circle layer by zoom level
              'heatmap-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  14,
                  1,
                  24,
                  0
              ]
          }
      }
  };
  addcircleData = ()=>{
      let source = this.map.getSource(this.sourcename)
      if (!source) {
          this.map.addSource(this.sourcename, {
              type: 'geojson',
              data: this.data
          })
      }
      return {
          'id': this.circlename,
          'type': 'circle',
          'source': this.sourcename,
          'minzoom': 18,
          'paint': {
          // Size circle radius by earthquake magnitude and zoom level
          "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              18, [
                  "interpolate",
                  ["linear"],
                  ["get", this.weight],
                  1, 1,
                  6, 4
              ],
              24, [
                  "interpolate",
                  ["linear"],
                  ["get", this.weight],
                  1, 5,
                  6, 50
              ]
          ],
              // Color circle by earthquake magnitude
              "circle-color": [
              "interpolate",
              ["linear"],
              ["get", this.weight],
              1, "rgba(33,102,172,0)",
              2, "rgb(103,169,207)",
              3, "rgb(209,229,240)",
              4, "rgb(253,219,199)",
              5, "rgb(239,138,98)",
              6, "rgb(178,24,43)"
          ],
              "circle-stroke-color": "white",
              "circle-stroke-width": 1,
              // Transition from heatmap to circle layer by zoom level
              "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              19, 0,
              24, 1
          ]
      }
      }
  }
  setData = (data) => {
      //console.log('data',data);
    this.map && this.map.getSource(this.sourcename).setData(data)
  }
  addLayer = () => {
      if (this.map && this.map.getLayer(this.layername)) {
        this.map && this.map.removeLayer(this.layername)
      }
      const option = this.addheatData()
    //   console.log("OPTIONS",option);
      this.map && this.map.addLayer(option)
      const optioncircle=this.addcircleData()
      this.map && this.map.addLayer(optioncircle)
  }
  destoryLayer = () => {
      if (this.map && this.map.getLayer(this.layername)) {
        this.map && this.map.removeLayer(this.layername)
      }
      if (this.map && this.map.getSource(this.sourcename)) {
        this.map && this.map.removeSource(this.sourcename)
      }
  }
}

export default HeatLayer
