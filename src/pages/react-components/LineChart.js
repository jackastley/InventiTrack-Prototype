import React, {useState, useEffect} from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  );
  
  
  function LineChart(props) {
    const [chartData, setChartData] = useState(null)
  
    useEffect(() => {

  
      function constructChartData(DBData) {
        if (DBData) {
          let dateLength=getLength()
          
          function getLength(){
            if(props.timespan){
              return 2
            }
            return props.dates.length
          }
          
          

          const labels = props.dates.slice(props.dates.length-dateLength,props.dates.length)
          let data = {
            labels: labels,
            datasets: [
              {
                label: props.chartLabel,
                data: DBData.slice(props.dates.length-dateLength,props.dates.length),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: props.colour
              }
            ],
          };
          setChartData(data);
        }
      }
      
      constructChartData(props.varData)
  
    }, [props.varData]);
  
  
  
    return (
      <>
        {chartData && <Line data={chartData} />}
      </>
    )
  
  }
  
  export default LineChart