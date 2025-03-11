import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from '../../features/home'
import Login from '../../features/auth/login'
import Join from '../../features/auth/join'
import Activation from '../../features/auth/activation'
import Recovery from '../../features/auth/recovery'
import Reset from '../../features/auth/reset'
import Profile from '../../features/user/profile'
import Error from '../../features/error'
import VowelChartContainer from '../../features/ipa/components/VowelChartContainer'
import JsonDisplay from '../../features/ipa/components/JsonDisplay'
import IPAAppContainer from '../../features/ipa/components/IPAAppContainer'
import EpisodeGridPage from '../../features/phraseGame/'
import GameModePage from '../../features/phraseGame/pages/GameModePage';  


function Routing() {
  return (
    <div 
      style={{ 
        flex: 1,  
        display: "flex",
        width: "100%",
        // height: "100%",
        overflowY: "hidden",
        justifyContent: "center", // Center horizontally  
        alignItems: "center", // Center vertically  
        margin: "0",
        padding: "10px",
        backgroundColor: "#f5f5f5", // Optional: Add a background color 
        
      }}  
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
        <Route path="/auth/activation/:id" element={<Activation />} />
        <Route path="/auth/activation/:id/:code" element={<Activation />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/auth/reset/:id" element={<Reset />} />
        <Route path="/auth/reset/:id/:code" element={<Reset />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/phrasegame" element={<EpisodeGridPage />} />
        <Route path="/game/:episodeId" element={<GameModePage />} /> 
        <Route  
          path="/ipa/vowelchart"  
          element={  
            <VowelChartContainer />
          }  
        />
        <Route  
          path="/ipa/ipaapp"  
          element={  
            <IPAAppContainer/>
          }   
        />      
        <Route
          path="/error/unauthorized"
          element={<Error status={401} message="Unauthorized request" />}
        />
        <Route
          path="/error/notfound"
          element={<Error status={404} message="Page not found" />}
        />
        <Route path="*" element={<Navigate to="/error/notfound" replace />} />
      </Routes>
    </div>
  )
}

export default Routing
