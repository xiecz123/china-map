import echarts from "../useEcharts";
const app = document.getElementById("app");
const myChart = echarts.init(app);
import geoCoordMap from "../data/provincialCapitalCoord";
import data from "../data/provincialCapitalValue";

myChart.showLoading();
import(`@/assets/map/json/china.json`).then((map) => {
  echarts.registerMap("china", map.default);
  myChart.hideLoading();

  const convertData = function (data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  const option = {
    backgroundColor: {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: "#0f378f", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#00091a", // 100% 处的颜色
        },
      ],
      globalCoord: false, // 缺省为 false
    },
    title: {
      top: 20,
      text: "全国数据",
      subtext: "",
      x: "center",
      textStyle: {
        color: "#ccc",
      },
    },

    tooltip: {
      trigger: "item",
      formatter: function (params) {
        if (typeof params.value[2] == "undefined") {
          return params.name + " : " + params.value;
        } else {
          return params.name + " : " + params.value[2];
        }
      },
    },
    geo: {
      map: "china",
      show: true,
      roam: true,
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: "#3a7fd5",
          borderColor: "#0a53e9", //线
          //shadowColor: '#092f8f',//外发光
          //shadowBlur: 20
        },
        emphasis: {
          areaColor: "#0a2dae", //悬浮区背景
        },
      },
    },
    series: [
      {
        symbolSize: 5,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true,
            color: "#fff",
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            color: "#fff",
          },
        },
        name: "light",
        type: "scatter",
        coordinateSystem: "geo",
        data: convertData(data),
      },
      {
        type: "map",
        map: "china",
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
            textStyle: {
              color: "#fff",
            },
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#031525",
            borderColor: "#FFFFFF",
          },
          emphasis: {
            areaColor: "#2B91B7",
          },
        },
        animation: false,
        data: data,
      },
      {
        name: "Top 5",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: [50, 50],
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 9,
            },
            formatter(value) {
              return value.data.value[2];
            },
          },
        },
        itemStyle: {
          normal: {
            color: "#D8BC37", //标志颜色
          },
        },
        data: convertData(data),
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        hoverAnimation: true,
        zlevel: 1,
      },
    ],
  };
  myChart.setOption(option);
});
