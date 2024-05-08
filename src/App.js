import "./App.css";
import ParticlesComponent from "./Componunts/particles";
import Textarea from "./Componunts/Textarea";

const App = () => {
  return (
    <div className="App">

      <ParticlesComponent id="particles" />
      <div className="main">
        <h1 id = "Main_title">Compiler Project</h1>
        
        <div className="phase_I containers">
          <Textarea />
        </div>
        
        <div className="phase_II containers">
          
        </div>
        
        <div className="phase_III containers">
            
        </div>
      
      </div>
      
      
    </div>
  );
}

export default App;
