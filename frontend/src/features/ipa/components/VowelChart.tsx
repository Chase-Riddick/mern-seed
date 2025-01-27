import React from "react";
import "../styles/VowelChart.scss";
// import "../../../../public/images/Blank_vowel_trapezoid.png";


const vowels = [  
    { id: "close_front", label: "i", position: { top: "5%", left: "10%" } },  
    { id: "close_central", label: "ɨ", position: { top: "5%", left: "50%" } },  
    { id: "close_back", label: "u", position: { top: "5%", left: "90%" } },  
  ];

const VowelChart: React.FC = () => {
    return (
        <div className="vowel-chart">
            <img
                src="/images/Blank_vowel_trapezoid.png"
                alt="IPA Vowel Trapezoid"
                className="trapezoid"
            />
            {/* <div className="vowel-position" style={{ top: "5%", left: "10%"}}>
                <span className="vowel-label">i</span>
            </div> */}
            {vowels.map((vowel) => (  
                <div  
                    key={vowel.id}  
                    className="vowel-position"  
                    style={{ top: vowel.position.top, left: vowel.position.left }}  
                >  
                    <span className="vowel-label">{vowel.label}</span>  
                </div>  
                ))}
        </div>
    );
}

export default VowelChart;