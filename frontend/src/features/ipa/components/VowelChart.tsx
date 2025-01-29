import React from "react";  
import "../styles/VowelChart.scss";  

const vowelPositions = [  
    {  
      id: "close_front",  
      top: "2%",  
      left: "5%",  
      vowels: [  
        { symbol: "i", onclick: "Close_front_unrounded_vowel" },  
        { symbol: "y", onclick: "Close_front_rounded_vowel" },  
      ],  
    },  
    {  
      id: "close_central",  
      top: "2%",  
      left: "45%",  
      vowels: [  
        { symbol: "ɨ", onclick: "Close_central_unrounded_vowel" },  
        { symbol: "ʉ", onclick: "Close_central_rounded_vowel" },  
      ],  
    },  
    {  
      id: "close_back",  
      top: "2%",  
      left: "80%",  
      vowels: [  
        { symbol: "ɯ", onclick: "Close_back_unrounded_vowel" },  
        { symbol: "u", onclick: "Close_back_rounded_vowel" },  
      ],  
    },  
    {  
      id: "nearclose_nearfront",  
      top: "16%",  
      left: "22%",  
      vowels: [  
        { symbol: "ɪ", onclick: "Near-close_near-front_unrounded_vowel" },  
        { symbol: "ʏ", onclick: "Near-close_near-front_rounded_vowel" },  
      ],  
    },  
    {  
      id: "nearclose_nearback",  
      top: "16%",  
      left: "72%",  
      vowels: [  
        { symbol: "ʊ", onclick: "Near-close_near-back_rounded_vowel" },  
      ],  
    },  
    {  
      id: "closemid_front",  
      top: "31%",  
      left: "15%",  
      vowels: [  
        { symbol: "e", onclick: "Close-mid_front_unrounded_vowel" },  
        { symbol: "ø", onclick: "Close-mid_front_rounded_vowel" },  
      ],  
    },  
    {  
      id: "closemid_central",  
      top: "31%",  
      left: "49%",  
      vowels: [  
        { symbol: "ɘ", onclick: "Close-mid_central_unrounded_vowel" },  
        { symbol: "ɵ", onclick: "Close-mid_central_rounded_vowel" },  
      ],  
    },  
    {  
      id: "closemid_back",  
      top: "31%",  
      left: "83%",  
      vowels: [  
        { symbol: "ɤ", onclick: "Close-mid_back_unrounded_vowel" },  
        { symbol: "o", onclick: "Close-mid_back_rounded_vowel" },  
      ],  
    },  
    {  
      id: "mid_central",  
      top: "45%",  
      left: "53%",  
      vowels: [  
        { symbol: "ə", onclick: "Mid-central_vowel" },  
      ],  
    },  
    {  
      id: "openmid_front",  
      top: "58%",  
      left: "31%",  
      vowels: [  
        { symbol: "ɛ", onclick: "Open-mid_front_unrounded_vowel" },  
        { symbol: "œ", onclick: "Open-mid_front_rounded_vowel" },  
      ],  
    },  
    {  
      id: "openmid_central",  
      top: "58%",  
      left: "56%",  
      vowels: [  
        { symbol: "ɜ", onclick: "Open-mid_central_unrounded_vowel" },  
        { symbol: "ɞ", onclick: "Open-mid_central_rounded_vowel" },  
      ],  
    },  
    {  
      id: "openmid_back",  
      top: "58%",  
      left: "80%",  
      vowels: [  
        { symbol: "ʌ", onclick: "Open-mid_back_unrounded_vowel" },  
        { symbol: "ɔ", onclick: "Open-mid_back_rounded_vowel" },  
      ],  
    },  
    {  
      id: "nearopen_front",  
      top: "76%",  
      left: "33%",  
      vowels: [  
        { symbol: "æ", onclick: "Near-open_front_unrounded_vowel" },  
      ],  
    },  
    {  
      id: "nearopen_central",  
      top: "72%",  
      left: "59%",  
      vowels: [  
        { symbol: "ɐ", onclick: "Near-open_central_unrounded_vowel" },  
      ],  
    },  
    {  
      id: "open_front",  
      top: "88%",  
      left: "42%",  
      vowels: [  
        { symbol: "a", onclick: "Open_front_unrounded_vowel" },  
        { symbol: "ɶ", onclick: "Open_front_rounded_vowel" },  
      ],  
    },  
    {  
      id: "open_back",  
      top: "88%",  
      left: "83%",  
      vowels: [  
        { symbol: "ɑ", onclick: "Open_back_unrounded_vowel" },  
        { symbol: "ɒ", onclick: "Open_back_rounded_vowel" },  
      ],  
    },  
  ];

const VowelChart: React.FC = () => {  
  return (  
    <div className="vowel-chart">  
      <img  
        src="/images/Blank_vowel_trapezoid.png"  
        alt="IPA Vowel Trapezoid"  
        className="trapezoid"  
      />  
      {vowelPositions.map((position) => (  
        <div  
          key={position.id}  
          className={`vowel-position ${position.id}`}  
          style={{ top: position.top, left: position.left }}  
        >  
          {position.vowels.map((vowel, index) => (  
            <span  
              key={index}  
              className="vowel-label interactive IPA"  
              onClick={() => console.log(vowel.onclick)}  
            >  
              {vowel.symbol}  
            </span>  
          ))}  
        </div>  
      ))}  
    </div>  
  );  
};  

export default VowelChart;