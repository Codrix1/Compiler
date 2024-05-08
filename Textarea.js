import React, { useEffect, useRef, useState } from "react";

const  Textarea = () => {
    const [text, setText] = useState('');
    const [Variable , setVariable] = useState("");
    const [Identifiers , setIdentifiers] = useState("");
    const [Reserved_Words , setReserved_Words] = useState(""); 
    const [Symbols , setSymbols] = useState("");
    const [word , setword] = useState("");

    const textareaRef = useRef(null);
    const handleInputChange = (event) => {
        const { value } = event.target;
        setText(value);
    };
    const numRows = text.split('\n').length;
    
    useEffect((Variable , Identifiers , Reserved_Words , Symbols ) => { 
      
      setIdentifiers("");
      setVariable("");
      setReserved_Words("");
      setSymbols("");
      textareaRef.current.value.split('').forEach(letter => {
        console.log(letter);
        switch(letter){
          case "/" :
          case "+" :  
          case "-" :
          case "*" :
          case "(" : 
          case ")" :
          case "{" :
          case "}" :
          case "," :
          case ";" :
          case "&&" :
          case "||" :
          case "<" :  
          case ">" :  
          case "=" :
          case "!" :  
            setSymbols((prevSymbols) => prevSymbols +letter+" , ");
            setword("");
            if(word !== "")
              {
                setVariable((prevVariable) => prevVariable + word.replaceAll(/\s/) + " , ");
              }
            break;
          default:
            setword((prevword)=>prevword + letter);
            break;
        }

        switch(word){
            case "int" :
            case "float" :
            case "double" :
            case "bool" :
            case "char" :
            setIdentifiers((prevIdentifiers) => prevIdentifiers + word + " , ");
              break;

            case "if":
            case "do":
            case "for":
            case "while":
            case "return":
            case "break":
            case "continue":
            case "end":
              setReserved_Words((prevReserved_Words) => prevReserved_Words + word + " , ");
              break;

            default:
              setVariable((prevVariable) => prevVariable + word + " , ");
              break;
            }});
      if(Variable!=="")
        {
          setVariable((prevVariable) => prevVariable.substring(0, prevVariable.length - 3) );
        }
      if(Symbols!=="")
        {
          setSymbols((prevSymbols) => prevSymbols.substring(0, prevSymbols.length - 3) );
        }
      if(Reserved_Words!=="")
        {
          setReserved_Words((prevReserved_Words) => prevReserved_Words.substring(0, prevReserved_Words.length - 3) );
        }
      if(Identifiers!=="")
        {
          setIdentifiers((prevIdentifiers) => prevIdentifiers.substring(0, prevIdentifiers.length - 3) );
        }  
                 
      },
        [text])

    return (
    <div>
      <div  className="UpperPart">
      <textarea 
       className="textbox"
       wrap="off"
       ref={textareaRef}
       value={text}
       onChange={handleInputChange}
       rows = {numRows}  />
      </div>

      
      <div className="LowerPart">

      <ul class="responsive-table">

        {Identifiers && <li class="table-row"> <div class="col col-1">Identifiers</div> <div class="col col-2">{Identifiers}</div> </li>}
        {Symbols && <li class="table-row"> <div class="col col-1">Symbols</div> <div class="col col-2">{Symbols}</div> </li>}
        {Reserved_Words && <li class="table-row"> <div class="col col-1">Reserved_Words</div> <div class="col col-2">{Reserved_Words}</div> </li>}
        {Variable && <li class="table-row"> <div class="col col-1">Variable</div> <div class="col col-2">{Variable}</div> </li>}

      </ul>
    


      </div>
       

    </div>
    
  );
}
export default Textarea;