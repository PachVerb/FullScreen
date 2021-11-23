export default function initOption(geoCoordMap, ZSData) {
  var convertData = function(data) {


    var res1 = []
    var maxvalue=0
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i]
      var fromCoord = geoCoordMap[dataItem[0].name]
      var toCoord = geoCoordMap[dataItem[1].name]
      var value= dataItem[1].value
      if (maxvalue<value) {
        maxvalue=value
      }
      // console.log(Math.ceil(value/5));
      if (fromCoord && toCoord) {
        res1.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value:value==0?1:value
          
        })
       }
    //   switch (Math.ceil(value/5) ) {
    //     case 0:
    //       break;
    //     case 1:
    //       if (fromCoord && toCoord) {
    //         res1.push({
    //           fromName: dataItem[0].name,
    //           toName: dataItem[1].name,
    //           coords: [fromCoord, toCoord],
              
    //         })
    //       }
    //       break;
    //       case 2:
    //         if (fromCoord && toCoord) {
    //           res2.push({
    //             fromName: dataItem[0].name,
    //             toName: dataItem[1].name,
    //             coords: [fromCoord, toCoord],
                
    //           })
    //         }
    //         break;

    //         case 3:
    //           if (fromCoord && toCoord) {
    //             res3.push({
    //               fromName: dataItem[0].name,
    //               toName: dataItem[1].name,
    //               coords: [fromCoord, toCoord],
                  
    //             })
    //           }
    //           break;
    //           case 4:
    //             if (fromCoord && toCoord) {
    //               res4.push({
    //                 fromName: dataItem[0].name,
    //                 toName: dataItem[1].name,
    //                 coords: [fromCoord, toCoord],
                    
    //               })
    //             }
    //             break;

    //             // case 5:
    //             //   if (fromCoord && toCoord) {
    //             //     res5.push({
    //             //       fromName: dataItem[0].name,
    //             //       toName: dataItem[1].name,
    //             //       coords: [fromCoord, toCoord],
                      
    //             //     })
    //             //   }
    //             //   break;
      
    //     default:
    //       if (fromCoord && toCoord) {
    //         res6.push({
    //           fromName: dataItem[0].name,
    //           toName: dataItem[1].name,
    //           coords: [fromCoord, toCoord],
              
    //         })
    //       }
    //       break;
    //   }
     
     }
    // console.log('hdrwdhwi',res);
    return {data:res1,maxvalue:maxvalue}
    //return {data1:res1,data2:res2,data3:res3,data4:res4,data5:res5,data6:res6}
  }

  var series = []
  var sourcedata=convertData(ZSData)
  var data=sourcedata.data
  var maxval=sourcedata.maxvalue
  // console.log("sourcedata",sourcedata);
  for (let i = 0; i < data.length; i++) {
    if (i==0) {
      series=[]
    }
    // console.log("index",i);
    series.push({
      name: '数据',
    coordinateSystem: 'GLMap',
    type: 'lines',
    zlevel: 1,
    animation: true,
    effect: {
      show: true,
      period: 10,
      trailLength: 0.1,
      color: '#fff45c',
      // symbolSize: sourcedata[i].value/5 >6?12:sourcedata[i].value/5+6
      symbolSize:3*(data[i].value/maxval)+6
    },
    lineStyle: {
      normal: {
        color: '#fff45c',
        //width: sourcedata[i].value/5 >6?6:sourcedata[i].value/5,
        width:3*(data[i].value/maxval),
        opacity: 1,
        curveness: 0.2
      }
    },
    data: [data[i]]
    })
    
  }
  // console.log("series",series);
  // if (!sourcedata.data1.length==0) {
  //   series.push({
  //     name: '数据1',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 6
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 1,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data1
  //   })
  // }
  // if (!sourcedata.data2.length==0) {
  //   series.push({
  //     name: '数据2',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 9
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 3,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data2
  //   })
  // }
  // if (!sourcedata.data3.length==0) {
  //   series.push({
  //     name: '数据3',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 12
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 6,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data3
  //   })
  // }
  // if (!sourcedata.data4.length==0) {
  //   series.push({
  //     name: '数据4',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 14
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 8,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data4
  //   })
  // }
  // if (!sourcedata.data5.length==0) {
  //   series.push({
  //     name: '数据5',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 16
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 10,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data5
  //   })
  // }
  // if (!sourcedata.data6.length==0) {
  //   series.push({
  //     name: '数据6',
  //   coordinateSystem: 'GLMap',
  //   type: 'lines',
  //   zlevel: 1,
  //   animation: true,
  //   effect: {
  //     show: true,
  //     period: 10,
  //     trailLength: 0.1,
  //     color: '#fff45c',
  //     symbolSize: 18
  //   },
  //   lineStyle: {
  //     normal: {
  //       color: '#fff45c',
  //       width: 12,
  //       opacity: 1,
  //       curveness: 0.2
  //     }
  //   },
  //   data: sourcedata.data6
  //   })
  // }
  series.push( {
    name: '数据',
    type: 'effectScatter',
    coordinateSystem: 'GLMap',
    zlevel: 2,
    rippleEffect: {
      period: 4,
      scale: 4,
      brushType: 'fill'
    },
    label: {
      normal: {
        show: false
      }
    },
    symbolSize: function(val) {
      return val[2] / 30
    },
    itemStyle: {
      normal: {
        color: '#fff45c'
      }
    },
    data: ZSData.map(function(dataItem) {
      return {
        name: dataItem[1].name,
        value: geoCoordMap[dataItem[1].name].concat([
          dataItem[1].value
        ])
      }
    })
  }, {
    name: '起点',
    type: 'effectScatter',
    coordinateSystem: 'GLMap',
    zlevel: 2,
    rippleEffect: {
      brushType: 'fill'
    },
    label: {
      normal: {
        show: false
      }
    },
    symbolSize: function(val) {
      return val[2] / 42
    },
    itemStyle: {
      normal: {
        color: '#fff45c'
      }
    },
    data: Object.keys(geoCoordMap).map(function(key) {
      return {
        name: key,
        value: geoCoordMap[key].concat([
          100
        ])
      }
    })
  })
  
  const option = {
    GLMap: {
      roam: true
    },
    coordinateSystem: 'GLMap',
    title: {
      show: false
    },
    // tooltip: {
    //   trigger: 'item'
    // },
    legend: {
      show: false
    },
    geo: {
      map: 'GLMap',
      label: {
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#404a59'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series: series
  }
  return option
}
