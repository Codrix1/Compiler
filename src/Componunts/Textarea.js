import React, { useEffect, useRef, useState } from "react";

const  Textarea = () => {
    const [text, setText] = useState('');
    const [Variable , setVariable] = useState("");
    const [Identifiers , setIdentifiers] = useState("");
    const [Reserved_Words , setReserved_Words] = useState(""); 
    const [Symbols , setSymbols] = useState("");
    const [Numbers , setNumbers] = useState("");
    const [Arrays , setArrays] = useState("");
    const textareaRef = useRef(null);
    const handleInputChange = (event) => {
        const { value } = event.target;
        setText(value);
    };
    const numRows = text.split('\n').length;
    
    useEffect((Variable , Identifiers , Reserved_Words , Symbols , word , Numbers  , arraysize , counterstate) => {
      setIdentifiers("");
      setVariable("");
      setReserved_Words("");
      setSymbols("");
      setNumbers("");
      setArrays("");
      word="";
      arraysize = 0;
      counterstate = false;
      const checkRepitition = (substring) =>
        {
          
        }
      const checkSymbols =(word)=>{
        switch(word){
          case "&&":
          case "||":
            return true;
          default:
            return false;
          }
      }
      const checkIdentifier = (word) =>
        {
          switch(word){
            case "int" :
            case "float" :
            case "double" :
            case "bool" :
            case "char" :
              return true;
            default:
              return false;
          }
        }
      const checkReservedWords = (word) =>
        {
          switch(word){
            case "if":
            case "do":
            case "for":
            case "while":
            case "return":
            case "break":
            case "continue":
            case "end ":
              return true;
            default:
              return false;
            }
        }
      const check =(word)=>
        {
          if(checkIdentifier(word)){
            setIdentifiers((prevIdentifiers) => prevIdentifiers + " \u02F9" +word + "\u02FA  ,");
          }
          else if (checkReservedWords(word)){
            setReserved_Words((prevReserved_Words) => prevReserved_Words + " \u02F9" + word + "\u02FA  ,");
          }
          else if(checkSymbols(word)){
            setSymbols((prevSymbols) => prevSymbols + " \u02F9" + word + "\u02FA  ,"); 
          }
          else if (isNaN(word)) {
            setVariable((prevVariable) => prevVariable + " \u02F9" + word + "\u02FA  ,");
          }
          else{
            setNumbers((prevNumber) => prevNumber + " \u02F9" +word + "\u02FA  ,");
          }
        }
      const addarray = (word , arraysize) =>{
        setArrays((prevArray)=>prevArray + " \u02F9" + word + " [" + arraysize.toString() + "]\u02FA , " );
      }  
      
      const letters = textareaRef.current.value.split('')      
      letters.forEach((letter) => {
        switch(letter){ 
          case "/" :
          case "+" :  
          case "-" :
          case "*" :
          case "(" : 
          case ")" :
          case "{" :
          case "}" :
          case ";" :
          case "<" :  
          case ">" :  
          case "=" :
          case "!" :  
            setSymbols((prevSymbols) => prevSymbols + " \u02F9" + letter + "\u02FA  ,"); 
            if(word !== "" && !counterstate){
              check(word);
              word=""; }
              break
          case " ":
          case '\n':
          case '\t':
            if(word !== "" && !counterstate){
              check(word);
              word=""; }
            break;
          case "[":
            if( !checkIdentifier(word) && !checkReservedWords(word) && !checkSymbols(word) && (isNaN(word) || word=="")){
                arraysize =1;
                counterstate = true;
            }
            break;
          case "]":
            if(counterstate){
                addarray(word , arraysize);
                counterstate = false   
                word="";
              }
            break
          case ",":
            setSymbols((prevSymbols) => prevSymbols + " \u02F9" + letter + "\u02FA  ,"); 
            if(counterstate){
              arraysize +=1;
            }
            break;    
          default:
            if(!counterstate){              
              word = word + letter;
            }
            break;
          }
        }
      );
      console.log(counterstate);
      console.log(arraysize);
      if(Variable!==""){
          setVariable((prevVariable) => prevVariable.substring(0, prevVariable.length - 3) );
        }
      if(Symbols!==""){
          setSymbols((prevSymbols) => prevSymbols.substring(0, prevSymbols.length - 3) );
        }
      if(Reserved_Words!==""){
          setReserved_Words((prevReserved_Words) => prevReserved_Words.substring(0, prevReserved_Words.length - 3) );
        }
      if(Identifiers!==""){
          setIdentifiers((prevIdentifiers) => prevIdentifiers.substring(0, prevIdentifiers.length - 3) );
        }
      if(Numbers!==""){
          setNumbers((prevNumbers) => prevNumbers.substring(0, prevNumbers.length - 3) );
        }
      if(Arrays!==""){
          setArrays((prevArrays) => prevArrays.substring(0, prevArrays.length - 3) );
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
        {Numbers && <li class="table-row"> <div class="col col-1">Numbers</div> <div class="col col-2">{Numbers}</div> </li>}
        {Arrays && <li class="table-row"> <div class="col col-1">Arrays</div> <div class="col col-2">{Arrays}</div> </li>}

      </ul>
    


      </div>
       

    </div>
    
  );
}
export default Textarea;