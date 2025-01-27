import React from "react";
import "../styles/VowelChart.scss";
// import "../../../../public/images/Blank_vowel_trapezoid.png";

const VowelChart: React.FC = () => {
    return (
        <div className="vowel-chart">
            <img
                src="/images/Blank_vowel_trapezoid.png"
                alt="IPA Vowel Trapezoid"
                className="trapezoid"
            />
            <div className="vowel-position" style={{ top: "5%", left: "10%"}}>
                <span className="vowel-label">i</span>
            </div>
        </div>
    );
}

export default VowelChart;