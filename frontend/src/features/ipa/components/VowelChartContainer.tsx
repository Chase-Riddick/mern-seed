import React from "react";  
import "../styles/VowelChart.scss";  
import VowelChart from "./VowelChart";

// interface VowelChartContainerProps {  
//   children: React.ReactNode;  
// }  

const VowelChartContainer: React.FC = () => {  
  return (  
    <div className="vowel-chart-container">  
      <VowelChart/>
    </div>  
  );  
};  

export default VowelChartContainer;