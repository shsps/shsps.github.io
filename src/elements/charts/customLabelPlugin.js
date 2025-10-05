const customLabelPlugin = {
  id: 'customLabelPlugin', // plugin 的名字，必須有
  afterDraw(chart) {
    const {ctx, chartArea: {width, height}} = chart;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 * 0.9;
    const data = chart.data.datasets[0].data;
    const total = data.reduce((a, b) => a + b, 0);

    let startAngle = -0.5 * Math.PI;

    data.forEach((value, index) => {
      const angle = (value / total) * (Math.PI * 2);
      const midAngle = startAngle + angle / 2;

      const labelRadius = radius + 20;

      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);

      // 畫小圓圈
      ctx.beginPath();
      ctx.arc(labelX, labelY, 5, 0, Math.PI * 2);
      ctx.fillStyle = chart.data.datasets[0].backgroundColor[index];
      ctx.fill();
      ctx.closePath();

      // 畫文字
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const companyName = chart.data.labels[index];
      ctx.fillText(`${companyName} ${value}張`, labelX, labelY - 15);

      startAngle += angle;
    });
  }
};

export default customLabelPlugin;
