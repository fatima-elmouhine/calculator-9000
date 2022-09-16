/* eslint no-eval:0 */

import React from 'react'
import BeautifulScreen from './BeautifulScreen';
import AmazingNumberButton from './AmazingNumberButton';
import MagnificientEqualButton from './MagnificientEqualButton';
import GreatOperationButton from './GreatOperationButton';
import ItSOverNineThousand from './ItSOverNineThousand';
import PreviousResult from './PreviousResult';

export default function Calculator() {

    //STATE
    const [screenInfo, setScreenInfo] = React.useState({
        calcul: "0",
        prevCalcul: "",
        result: 0

    });
    const [isOperator, setIsOperator] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [savedCalcul, setSavedCalcul] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(false);


    //  NUMBERS BUTTONS
    const AmazingNumberButtons = [];
    for (let i = 9; i >= 0 ; i--) {
        AmazingNumberButtons.push(<AmazingNumberButton key={i}
            handle={()=>{
                setIsSaved(false);

                if (screenInfo.calcul !== "0") {
                    setScreenInfo(prevStateInfo => {
                        return {
                            ...prevStateInfo,
                            calcul: prevStateInfo.calcul + i,
                            result: eval(prevStateInfo.calcul + i)

                        }}
                        )
                }else{
                    setScreenInfo(prevStateInfo => {
                        return {
                            ...prevStateInfo,
                            calcul: 0+i+"",
                            result: i
                        }})
                }

        }}

            number={i}  />);
    }
    var eyeClose = <i className="fa-solid fa-eye-slash"></i>
    var eyeOpen = <i className="fa-regular fa-eye"></i>

     AmazingNumberButtons.push(<button key="19" className='btn' onClick={handleDelete}> <i className="fa-solid fa-trash"></i></button> )
     savedCalcul.length!== 0 && AmazingNumberButtons.push(<button key="20" className={(isShow && savedCalcul.length !== 0  )? 'btn eyeClose' : 'btn eyeOpen'} onClick={handleRead}> {isShow && savedCalcul.length !== 0  ? eyeClose : eyeOpen}</button> )

    //  OPERATOR BUTTONS

    const GreatOperationButtons = ["+", "-", "*", "/", ".", "C"];
    const GreatOperation = GreatOperationButtons.map((index, operation) => {
        return <GreatOperationButton handle={()=>{


            var strCalcul = screenInfo.calcul
            var lastChar = strCalcul.charAt(strCalcul.length-1)
            for (let i = 0; i < GreatOperationButtons.length; i++) {
                if (GreatOperationButtons[i] === lastChar) {
                     strCalcul = strCalcul.substring(0, strCalcul.length-1);
                    // eslint-disable-next-line no-loop-func
                    setScreenInfo(prevStateInfo => {
                        return {
                            ...prevStateInfo,
                            calcul: eval(strCalcul) 
                        }
                    }
                    )
                }
            }

            if(screenInfo.calcul !== "0" ){

                setScreenInfo(prevStateInfo => {
                    return {
                        ...prevStateInfo,
                        calcul: prevStateInfo.calcul + index
                    }
                })
            }

            else if(index === "."){
                setScreenInfo(prevStateInfo => {
                    return {
                        ...prevStateInfo,
                        calcul: "0" + index
                    }
                })
            }
            if(index === "C" ){

                setScreenInfo(prevStateInfo => {
                    return {
                        ...prevStateInfo,
                        calcul: "0",
                        prevCalcul: "",
                        result: 0
                    }
                })
            }


            }}

            key={index} operation={index} />;

    });
    
    function handleEqual() {
    if(screenInfo.calcul.includes("+") || screenInfo.calcul.includes("-") || screenInfo.calcul.includes("*") || screenInfo.calcul.includes("/")){
        setIsOperator(true);
    }
        setScreenInfo(prevStateInfo => {
            return {
                ...prevStateInfo,
                calcul:" "+ prevStateInfo.result,
                prevCalcul: prevStateInfo.calcul,
            }
        })
    }

    React.useEffect(() => {
        fetch('http://localhost:8888/calculator-9000/api/saveCalc.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(screenInfo),
        })
        .then(()=>{
            setIsShow(!isShow)
        })

    }, [isSaved]);

    function handleSave(){
        if(screenInfo.calcul !== "0" ){
            fetch('http://localhost:8888/calculator-9000/api/saveCalc.php',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(screenInfo),
            })
            .then(()=>{
                handleRead()
                // setIsSaved(!isSaved)
                setIsShow(!isShow)
            })
        }else{
            alert("il n'ya rien à sauvegarder")
        }
}

     function handleRead(){
        setIsShow(!isShow)
        fetch("http://localhost:8888/calculator-9000/api/getCalc.php")
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
        })
        .then(data => {
            setSavedCalcul(data)
        })
        .catch(error => console.log(error))
    }


    function handleDelete(id){
        if(typeof id == "string"){
            fetch('http://localhost:8888/calculator-9000/api/deleteCalc.php',{
                method: 'POST',
                body: JSON.stringify({id: id}),
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                handleRead()
                setIsShow(true)

        })}else{
            fetch('http://localhost:8888/calculator-9000/api/deleteCalc.php',{
                method: 'POST',
            })
            .then((response)=>{return response.json()})
            .then((data)=>{
                handleRead()
                setIsShow(false)
            })
        }
        setScreenInfo(prevStateInfo => {
            return {
                ...prevStateInfo,
                calcul: "0",
                prevCalcul: "",
                result: 0
            }
        })

    }

  return (
    <div className='calculator'>
        <BeautifulScreen result={screenInfo.result} number={screenInfo.calcul} />
        <div className='buttons'>
            <div className='numbers'>
            {AmazingNumberButtons}
            </div>
            <div className='operators'>
            {GreatOperation}
            <button className='btn' onClick={handleSave}> <i className="fa-regular fa-floppy-disk"></i></button>
            <MagnificientEqualButton handleEqual={handleEqual} />
        </div>
        </div>
        
            {(screenInfo.result >= 9000 && isOperator) && <ItSOverNineThousand />}
           {savedCalcul.length !== 0 && <div  className={isShow ?'savedCalcul' : ''}>
                {savedCalcul.map((singleData, index) => {
                    return <PreviousResult show={isShow} value={singleData.id} key={index} handleDeleteParent={handleDelete} date={singleData.createdAt} id={singleData.id} calculation={singleData.calculation} result={singleData.result} />
                })
                }
            </div>}

    </div>
  )
}
