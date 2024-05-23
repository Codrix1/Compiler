import React, { useEffect, useRef, useState } from "react";

const  Textarea = () => {
    const [text, setText] = useState('');
    const [Variable , setVariable] = useState("");
    const [Identifiers , setIdentifiers] = useState("");
    const [Reserved_Words , setReserved_Words] = useState(""); 
    const [Symbols , setSymbols] = useState("");
    const [Numbers , setNumbers] = useState("");
    const [Arrays , setArrays] = useState("");
    const[Errors , setErrors] = useState("");
    
    const textareaRef = useRef(null);
    const handleInputChange = (event) => {
        const { value } = event.target;
        setText(value);
    };
    const numRows = text.split('\n').length;
    

    useEffect((word , arraysize , counterstate ,Elements, intialized_vars , i , j, prevReserved_Word , ifcondition, sqct , stack , do_counter , stringadders , a)  => {
      setIdentifiers("");
      setVariable("");
      setReserved_Words("");
      setSymbols("");
      setNumbers("");
      setArrays("");
      setErrors("")
      Elements = [];
      word="";
      arraysize = 0;
      counterstate = false;
      console.clear()
    
      const checkSymbols =(word)=>{
        switch(word){
          case "&&":
          case "||":
          case "/" :
          case "+" :  
          case "-" :
          case "*" :
          case "(" : 
          case ")" :
          case "{" :
          case "}" :
          case ";" :
          case ":" :
          case "<" :  
          case ">" :  
          case "=" :
          case "!" :
          case ",":
          case "[":
          case "]":  
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
            case "case":
            case "switch":
            case "if":
            case "do":
            case "else":
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
          if(checkIdentifier(word)   ){
            setIdentifiers((prevIdentifiers) => prevIdentifiers + "  \u2800 " +word + " \u2800   ");
          }
          else if (checkReservedWords(word)){
            setReserved_Words((prevReserved_Words) => prevReserved_Words + "  \u2800 " + word + " \u2800   ");
          }
          else if(checkSymbols(word)){
            setSymbols((prevSymbols) => prevSymbols + "  \u2800 " + word + " \u2800   "); 
          }
          else if (isNaN(word)) {
            setVariable((prevVariable) => prevVariable + "  \u2800 " + word + " \u2800   ");
          }
          else{
            setNumbers((prevNumber) => prevNumber + "  \u2800 " +word + " \u2800   ");
          }
        }
      const checkCondition = (ender) =>{
        ifcondition = false;
        while(i<Elements.length){
          if((i+1) < Elements.length && (Elements[i+1]!="&&" && Elements[i+1]!="||" && Elements[i+1]!=ender  ) ){i+=1}
          if((i+1) < Elements.length && (Elements[i+1]=="&&" || Elements[i+1]=="||" || Elements[i+1]==ender  )) {
            if( !checkIdentifier(Elements[i]) &&  !checkReservedWords(Elements[i]) &&  !checkSymbols(Elements[i]) ){
              if((i+1) < Elements.length){i+=1}
              ifcondition = true;
            }
            else {
              setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + " condition is not writtin correctly")
              return false
            }
          }
          else 
          if((i+2) < Elements.length && (Elements[i+2]=="&&" || Elements[i+2]=="||" || Elements[i+2]==ender )) {
            ifcondition = false;
            if( !checkIdentifier(Elements[i+1]) &&  !checkReservedWords(Elements[i+1]) &&  !checkSymbols(Elements[i+1]) && Elements[i]=="!" ){
              if((i+2) < Elements.length){i+=2}
            }
            else {
              setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "\n" + " condition is not writtin correctly")
              return false
            }
          }
          else 
          if((i+3) < Elements.length && (Elements[i+3]=="&&" || Elements[i+3]=="||" || Elements[i+3]==ender )) {
            ifcondition = false;
            if( !checkIdentifier(Elements[i]) &&  !checkReservedWords(Elements[i]) &&  !checkSymbols(Elements[i])
                && (Elements[i+1] ==">" || Elements[i+1] =="<" || Elements[i+1] =="%" || Elements[i+1] =="-" || Elements[i+1] =="+" || Elements[i+1] =="/" || Elements[i+1] =="*")  
                && !checkIdentifier(Elements[i+2]) &&  !checkReservedWords(Elements[i+2]) &&  !checkSymbols(Elements[i+2]) 
              ){
                if((i+3) < Elements.length){i+=3}
            }
            else
            {
              setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "condition is not writtin correctly")
              return false
            }
            
          }
          else 
          {
            
            if(Elements[i-1]==ender){
              return true
            }
            else{
              if((Elements[i]=="||" || Elements[i]=="&&") && Elements[i+1]==ender){
                setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "condition is not writtin correctly")
                return  false
              }
              else{
                i+=1;
                setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing ) ");
              }
             
              
            }
          }
        }
        return true
      }
      const Checksyntax = (type) =>{
        let linestart = false
        let prevElemement = "";
        for(;i<Elements.length;i+=1)
          {
            if(checkReservedWords(Elements[i]) || checkIdentifier(Elements[i]))
              {
                if(linestart){
                  setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ; before "+ Elements[i])
                  return;
                }
                else{
                  return;
                }
              }
            else if(Elements[i] == ";"){
              if(linestart)
                {
                  if(checkSymbols(prevElemement))
                    {
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a variable or number before "+ Elements[i])
                      return false;
                    }
                    else
                    {
                      linestart = false;

                      if(type == "for"){
                        return 
                      }
                    }
                }
                else{
                   setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "unexpected ;")
                }
                  
              return
            }
            else if(!linestart && !checkSymbols(Elements[i]))
            {
              if(!isNaN(Elements[i]))
                {
                  setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "Cannot start with a number")
                  return
                }
              else
              {
                prevElemement = Elements[i] 
                linestart = true;
              }
              
            }
            else if(linestart){
              if(checkSymbols(Elements[i]))
                {
                  switch (Elements[i]){
                    case "/":
                    case "+":
                    case "-":
                    case "*":
                    case "%":
                    case "=":
                      if(!checkSymbols(prevElemement))
                        {
                          prevElemement = Elements[i];
                        }
                        else{
                          setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + " cannot have two symbols after each other")
                          return;
                        }
                        break;
                    case "}": 
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ; ")
                      break
                    case ")":
                      if(type == "for"){
                        return 
                      } 
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ; ")
                      break
                    default:
                        setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + " cannot use " + Elements[i] +" as an operator");
                        return;
                  }
                }
                else if(checkSymbols(prevElemement)){
                  prevElemement = Elements[i]
                }
                else{
                  setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing an operator")
                  return
                }
            }
            else{
              return true
            }
            
          }
        return 
      }
      const checkforCondition = () =>{
        
        if((i+1) >= Elements.length){return;}else{i+=1}
        Checksyntax("for")
        
        if(Elements[i]!=";"){
          setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing ; ")
          return false
        }
        if((i+1) >= Elements.length){return;}else{i+=1}
        checkCondition(";") 

        Checksyntax("for")

        if(Elements[i] == ")"){
          if((i+1) >= Elements.length){return;}else{i+=1}
          return true
        }
        return false

      } 
      const analyszer = () =>{
        sqct = 0;
        intialized_vars = [];
        stack = [];
        prevReserved_Word = "";
        for (i = 0 ; i <Elements.length;i++){
          if (checkIdentifier(Elements[i]))
          {
            console.log(9)
            if((i+1) >= Elements.length){return;}else{i+=1}
            for(;i<Elements.length;i+=1){
              console.log(Elements[i])
              if( !checkIdentifier(Elements[i]) &&  !checkReservedWords(Elements[i]) &&  !checkSymbols(Elements[i]) && isNaN(Elements[i]) ){
              console.log(1)
                if (!intialized_vars.includes(Elements[i])){
                  
                  intialized_vars.push(Elements[i]);
                }
                else{
                  setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + Elements[i] + " is identified more than once")
                  break
                }
              }
              else if(Elements[i] == ';'){
                i+=1;
                break;
              }
              else if(Elements[i] != ','){
                setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ; or , after "+Elements[i-1]);
                break
              }
              else if(Elements[i] == ','){}
              else{
                setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + Elements[i]+" cannot be a variable")
                break
              }
            }
          }
          
          if(checkReservedWords(Elements[i])){
              for(;i<Elements.length;i+=1)  {
                if(Elements[i] == "switch")
                  {
                    if((i+1) >= Elements.length){break;}else{i+=1}
                    if(Elements[i] != "("){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing (")}

                    if((i+1) >= Elements.length){break;}else{i+=1}
                    if (checkIdentifier(Elements[i]) ||  checkReservedWords(Elements[i]) ||  checkSymbols(Elements[i])){
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "cant have "+Elements[i]+" after switch")
                    }
                    
                    if((i+1) >= Elements.length){break;}else{i+=1}
                    if(Elements[i] != ")"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing )")}

                    if((i+1) >= Elements.length){break;}else{i+=1}
                    if(Elements[i] != "{"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing {")}

                    for(i+=1;i<Elements.length;i+=1){

                      
                      if(Elements[i] != "case"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing case")}
                      
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if (checkIdentifier(Elements[i]) ||  checkReservedWords(Elements[i]) ||  checkSymbols(Elements[i])){
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "cant have "+Elements[i]+" after case")
                      } 
                    
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] != ":"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing :")}
                      
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      Checksyntax("norm")

                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] != "break"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing break")}

                      
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] != ";"){ setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing ;")}
                      else
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] == "}"){ 
                        if((i+1) >= Elements.length){return;}else{i+=1}
                        break
                     }
                      
                    }

                  }
                if(Elements[i] == "for")
                  {
                    stack.push(Elements[i])
                    if((i+1) >= Elements.length){break;}else{i+=1}
                    if(Elements[i] == "(")
                    {

                      if(checkforCondition()){
                        if(Elements[i]=="{"){
                          
                          sqct++;
                        }
                        else{
                          setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missed { ")
                          break
                        }
                      }
                    }
                    else
                    {
                      setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ( ")
                      break
                    }
                  }
                  if(Elements[i] == "if")
                    {
                      stack.push(Elements[i])
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] == "(")
                      {
                        if(checkCondition(")")){
                          if(Elements[i]=="{"){
                            
                            sqct++;
                          }
                          else{
                            setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missed { ")
                            break
                          }
                        }
                      }
                      else
                      {
                        setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ( ")
                        break
                      }
                    }
                if(Elements[i] == "do")
                  {
                    do_counter+=1;
                    stack.push(Elements[i])
                    if((i+1) >= Elements.length){break;}else{i+=1}
                    
                      if(Elements[i]=="{"){
                        sqct++;
                      }
                      else{
                        setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missed { ")
                        break
                      }                     
                  }
                if(Elements[i] == "while")
                  {
                    if(prevReserved_Word == "do")
                    {
                      do_counter-=1;
                      stack.push(Elements[i])
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] == "(")
                      {
                        checkCondition(")")
                      }    
                      else
                      {
                        setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ( ")
                        break
                      }
                            
                    }
                    else{
                      stack.push(Elements[i])
                      if((i+1) >= Elements.length){break;}else{i+=1}
                      if(Elements[i] == "(")
                      {
                        if(checkCondition(")")){
                          if(Elements[i]=="{"){
                            sqct++;
                          }
                          else{
                            setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missed { ")
                            break
                          }
                        }
                      }
                      else
                      {
                        setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "expecting a ( ")
                        break
                      }
                    }                     
                  }
                if(Elements[i] == "}")
                  {
                    prevReserved_Word = stack.pop()
                    sqct-=1
                    if(stack.length == 0){
                      break
                    }
                    
                  }
                Checksyntax("norm")
              }
            
          }
          else {
            Checksyntax("norm")
          }
          console.log("current" + Elements[i])
          console.log(intialized_vars)
          
        }
        if(sqct > 0)
        {
          setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing }")
        }
        else if(sqct < 0)
        {
          setErrors((prevErrors) =>  prevErrors + "\u2800" + "\u2800" + "missing {")
        }
        


      }
      const addarray = (word , arraysize) =>{
        setArrays((prevArray)=>prevArray + "  \u2800 " + word + " [" + arraysize.toString() + "] \u2800  , " );
      }
      const letters = textareaRef.current.value.split('')      
      letters.forEach((letter) => {
        switch(letter){ 
          case "/" :
          case "+" :  
          case "-" :
          case "*" :
          case "=" :
          case "(" : 
          case ")" :
          case "{" :
          case "}" :
          case ";" :
          case ":" :
          case "<" :  
          case ">" :  
          case "!" :
            if(word !== "" && !counterstate){
              check(word);
              Elements.push(word);
              word=""; 
            }  
            setSymbols((prevSymbols) => prevSymbols + " \u2800 " + letter + " \u2800   "); 
            Elements.push(letter);
            break; 
          case " ":
          case '\n':
          case '\t':
            if(word !== "" && !counterstate){
              check(word);
              Elements.push(word);
              word=""; 
            }
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
                Elements.push(word);
                word="";
              }
            break
          case ",": 
            if(counterstate){
              arraysize +=1;
            }
            setSymbols((prevSymbols) => prevSymbols + "  \u2800 " + letter + " \u2800   ");
            Elements.push(letter);
            break;    
          default:
            if(!counterstate){              
              word = word + letter;
            }
            break;
          }
        }
      );
      console.log("Elements  "+Elements);
      console.log(Errors)
      analyszer()
            
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

        {Errors && <p style={{color:'red'}}> {Errors} </p>}


      </div>
       
      
    </div>
    
  );
}
export default Textarea;