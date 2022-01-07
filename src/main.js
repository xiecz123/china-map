import echarts from "./useEcharts";
import keyBy from "lodash/keyBy";
import provinces from "./data/area";
const provincesByName = keyBy(provinces, "name");

const app = document.getElementById("app");
// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(app);
const backButton = document.getElementById("back-button");

registerMap();
backButton.addEventListener("click", () => {
  registerMap();
});

myChart.on("click", (params) => {
  const province = provincesByName[params.name];
  if (province) {
    registerMap(province);
  }
});

const getOption = (province) => {
  return {
    series: [
      {
        type: "map",
        map: province ? province.pinyin : "china",
      },
    ],
  };
};

async function registerMap(province) {
  if (province) {
    await import(`@/assets/map/json/province/${province.pinyin}.json`).then(
      (map) => {
        echarts.registerMap(province.pinyin, map.default);
        myChart.setOption(getOption(province));
      }
    );
  } else {
    await import(`@/assets/map/json/china.json`).then((map) => {
      echarts.registerMap("china", map.default);
      myChart.setOption(getOption(province));
    });
  }
}
