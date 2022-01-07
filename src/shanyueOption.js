const getOption = (province, data) => {
  return {
    visualMap: {
      show: true,
      type: "piecewise",
      min: 0,
      max: 2000,
      align: "right",
      top: province ? 0 : "40%",
      right: 0,
      left: province ? 0 : "auto",
      inRange: {
        color: ["#ffc0b1", "#ff8c71", "#ef1717", "#9c0505"],
      },
      pieces: [
        { min: 1000 },
        { min: 500, max: 999 },
        { min: 100, max: 499 },
        { min: 10, max: 99 },
        { min: 1, max: 9 },
      ],
      padding: 5,
      // "inverse": false,
      // "splitNumber": 5,
      orient: province ? "horizontal" : "vertical",
      showLabel: province ? false : true,
      text: ["高", "低"],
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 10,
      },
      // "borderWidth": 0
    },
    series: [
      {
        left: "center",
        // top: '15%',
        // bottom: '10%',
        type: "map",
        name: "确诊人数",
        silent: province ? true : false,
        label: {
          show: true,
          position: "inside",
          // margin: 8,
          fontSize: 6,
        },
        mapType: province ? province.pinyin : "china",
        data,
        zoom: 1.2,
        roam: false,
        showLegendSymbol: false,
        emphasis: {},
        rippleEffect: {
          show: true,
          brushType: "stroke",
          scale: 2.5,
          period: 4,
        },
      },
    ],
  };
};

export default getOption;
