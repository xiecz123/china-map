import echarts from "../useEcharts";
import keyBy from "lodash/keyBy";
import provinces from "../data/area";
const provincesByName = keyBy(provinces, "name");
const provincesByPinyin = keyBy(provinces, "pinyin");
const app = document.getElementById("app");

const btn = document.createElement("button");
btn.setAttribute("id", "back-button");
btn.innerHTML = "返回全国地图";
btn.addEventListener("click", () => {
  window.history.pushState(null, null, "/");
  renderMap();
});
document.body.appendChild(btn);

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(app);

const setProvinceByUrl = () => {
  const p = window.location.pathname.slice(1);
  renderMap(p ? provincesByPinyin[p] : null);
};

// 监听popstate事件
window.addEventListener("popstate", setProvinceByUrl);

renderMap();

myChart.on("click", (params) => {
  const p = provincesByName[params.name];
  if (p) {
    window.history.pushState(null, null, p.pinyin);
    renderMap(p);
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

async function renderMap(province) {
  if (province) {
    await import(`@/assets/map/json/province/${province.pinyin}.json`).then(
      (map) => {
        echarts.registerMap(province.pinyin, map.default);
      }
    );
  } else {
    await import(`@/assets/map/json/china.json`).then((map) => {
      echarts.registerMap("china", map.default);
    });
  }
  myChart.setOption(getOption(province));
}
