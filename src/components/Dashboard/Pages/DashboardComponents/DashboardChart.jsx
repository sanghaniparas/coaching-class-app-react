import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const DashboardChart = ({ dashboard }) => {
  const [chartData, setChartData] = useState({});
  const [years, setYears] = useState(null);
  const [currYear, setcurrYear] = useState(new Date().getFullYear());
  const [chartTime, setChartTime] = useState('year');

  const chart = (arr) => {
    setChartData({
      labels: arr.map((x,i) => x.testName),
      datasets: [
        {
          label: 'Topper',
          data: arr.map((x) => x.topperScore),
          backgroundColor: '#3f629f',
        },
        {
          label: 'You',
          data: arr.map((x) => x.score),
          backgroundColor: '#fc8f2d',
        },
        {
          label: 'Average',
          data: arr.map((x) => x.avgScore),
          backgroundColor: '#a4a4a4',
        },
      ],
    });
  };
  useEffect(() => {
    console.log("dashboard", dashboard.lastTenYearPerformance);
    setYears(dashboard.lastTenYearPerformance)

  }, [dashboard])

  useEffect(() => {
    if (chartTime === 'year') {
      //chart(dashboard.yearlyTestPerformance);
      let { data } = dashboard.lastTenYearPerformance.find((item) => Number(item.year) === Number(currYear))
      chart(data)

    }
    if (chartTime === 'month') {
      chart(dashboard.lastMonthTestPerformance);
    }
    if (chartTime === 'week') {
      chart(dashboard.lastWeekTestPerformance);
    }
  }, [dashboard, chartTime]);

  const handleChangeYear = (e) => {

    console.log("console", e.target.value)

    setcurrYear(e.target.value)
    let { data } = years.find((item) => Number(item.year) === Number(e.target.value))

    chart(data)
    console.log("data **", data);


  }

  return (
    <>
      <div className="filter-headear dashboard">
        <h3>Test Performance</h3>
        <div className="filter-group">
           <span
            onClick={() => setChartTime('week')}
            style={{ cursor: 'pointer' }}
            className={chartTime === 'week' && 'custom-select'}>
            Week
          </span> 
          <span
            onClick={() => setChartTime('month')}
            style={{ cursor: 'pointer' }}
            className={chartTime === 'month' && 'custom-select'}>
            Month
          </span>

          {/* <select onChange={handleChangeYear}>
            {years && years.slice(5).reverse().map((item) => (
              <option value={item.year}>Year {item.year}</option>
            ))}
          </select> */}
          <span
            onClick={() => setChartTime('year')}
            style={{ cursor: 'pointer', color: '#929292' }}
            className={chartTime === 'year' && 'custom-select'}>
            <select onChange={handleChangeYear} value={currYear}>
              {years && years.slice(5).reverse().map((item) => (
                <option value={item.year}>Year {item.year}</option>
              ))}
            </select>
          </span>
        </div>
      </div>

      <div className="a-test-series">
        <div className="a-tes-doc test-performance">
          <div className="chart-wrapper">
            <p className="chart-title">
              You can view weekly, monthly and yearly test performance
            </p>
            <span className="side-label">Marks</span>
            <div className="canvas_block">
                <Bar  data={chartData}  options={{ maintainAspectRatio: false }}/>
            </div>          
            <span className="bottom-label">Tests</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardChart;
