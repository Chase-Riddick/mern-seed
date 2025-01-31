import React from "react";  
import jsonData from "../data/letterData.json"

const JsonDisplay: React.FC = () => {  
//   const jsonData = {  
//     letters: [  
//       {  
//         englishLetter: "A",  
//         sounds: [  
//           {  
//             IPA: "æ",  
//             audioURL: "",  
//             modelWords: [  
//               {  
//                 englishSpelling: "apple",  
//                 IPASpelling: "ˈæpəl",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//               {  
//                 englishSpelling: "cat",  
//                 IPASpelling: "kæt",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//             ],  
//           },  
//           {  
//             IPA: "eɪ",  
//             audioURL: "",  
//             modelWords: [  
//               {  
//                 englishSpelling: "ape",  
//                 IPASpelling: "eɪp",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//               {  
//                 englishSpelling: "cake",  
//                 IPASpelling: "keɪk",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//             ],  
//           },  
//         ],  
//       },  
//       {  
//         englishLetter: "B",  
//         sounds: [  
//           {  
//             IPA: "b",  
//             audioURL: "",  
//             modelWords: [  
//               {  
//                 englishSpelling: "bat",  
//                 IPASpelling: "bæt",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//               {  
//                 englishSpelling: "baby",  
//                 IPASpelling: "ˈbeɪbi",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//             ],  
//           },  
//         ],  
//       },  
//       {  
//         englishLetter: "C",  
//         sounds: [  
//           {  
//             IPA: "k",  
//             audioURL: "",  
//             modelWords: [  
//               {  
//                 englishSpelling: "cat",  
//                 IPASpelling: "kæt",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//               {  
//                 englishSpelling: "cake",  
//                 IPASpelling: "keɪk",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//             ],  
//           },  
//           {  
//             IPA: "s",  
//             audioURL: "",  
//             modelWords: [  
//               {  
//                 englishSpelling: "city",  
//                 IPASpelling: "ˈsɪti",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//               {  
//                 englishSpelling: "face",  
//                 IPASpelling: "feɪs",  
//                 wordAudioURL: "",  
//                 wordVideoURL: "",  
//               },  
//             ],  
//           },  
//         ],  
//       },  
//       // Other letters would go here...  
//     ],  
//   };  

  return (  
    <div className="p-4">  
      <h1 className="text-2xl font-bold mb-4">JSON Object</h1>  
      <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-auto">  
        {JSON.stringify(jsonData, null, 2)}  
      </pre>  
    </div>  
  );  
};  

export default JsonDisplay;