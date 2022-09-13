
import { useState } from 'react';
import './App.css';

function App() {
  const [selectList, setList] = useState(["HB", "JS", "Nil", "Other"])
  const [showNurse, setShowNurse] = useState(false)
  const [showMultiple, setMultiple] = useState(false)
  const [showother, setOther] = useState(false)
  const [selectOther, setselectOther] = useState(false)

  const [selectyesNo, setselectyesNo] = useState(false)

  const [selectedYesNo, setselectedyesNo] = useState("")
  const [showyesnoother, setyesnoOther] = useState(false)
  const [selectyesnoOther, setselectyesnoOther] = useState(false)

  const [listItems, setListItem] = useState({})
  const singleSelectShow = (flag) => setShowNurse(flag)
  const singlemulitpleSelectShow = (flag) => setMultiple(flag)
  const otherSelectShow = (flag) => setOther(flag)
  const otherSelectyesnoShow = (flag) => setyesnoOther(flag)

  const singleSelect = (e, item, flag) => {
    setShowNurse(true)
    listSetProps(item, flag, "single")
  }

  const mulitpleSelect = (e, item, flag) => {
    console.log("item ", item)
    setMultiple(true)
    listSetProps(item, flag, "mulitple")
  }

  const otherSelect = (e, item, flag) => {
    console.log("item ", item)
    setOther(true)
    if(item == "Other"){
      setOther(false)
      setselectOther(true)
      listItems[flag] = []
    } else {
      listSetProps(item, flag, "mulitple")
    }
    //
  }

  const otheryesnoSelect = (e, item, flag) => {
    console.log("item ", item)
    setyesnoOther(true)
    if(item == "Other"){
      setyesnoOther(false)
      setselectyesnoOther(true)
      listItems[flag] = []
    } else {
      listSetProps(item, flag, "mulitple")
    }
    //
  }

  const yesNo = (e, item) => {
    setselectedyesNo(item)
    setselectyesNo(item == "yes"? true : false)
  }

  const listSetProps = (item, flag, type) => {

    if (type == "single") {
      listItems[flag] = [item]
    }

    if (type == "mulitple") {
      if (listItems[flag]) {
        if(!listItems[flag].includes(item)){
          listItems[flag].push(item)
        }
        
      } else {
        listItems[flag] = [item]
      }
    }
    setListItem(listItems)
  }

  
  const onEnterClick = (e, flag) => {

    if (e.key === 'Enter') {
      if (flag == "Other") {
        setOther(true)
        setselectOther(false)
      } else {
        setyesnoOther(true)
        setselectyesnoOther(false)
      }
      let item = e.target.value
      listSetProps(item, flag, "single")
    }
  }
  return (

    <div className="App">
      <div className='singleSelect'>
        <h1>Single Option</h1>
        <div>
          Nurse:
          {!showNurse && selectList.map((item, index) =>
          (
            item != "Other" && <p className={'selectItem'} onClick={(e) => singleSelect(e, item, "single")} key={index}>{item}</p>
          )
          )}
          {showNurse && <p className='selectBox' onClick={(e) => singleSelectShow(false)} >{listItems.single && listItems.single.map((item, i) =>
            (<span key={i}>{item}</span>)
          )}</p>}
        </div>
      </div>


      <div className='singleSelect'>
        <h1>Multiple Option</h1>
        <div>
          Nurse:
          {!showMultiple && selectList.map((item, index) =>
          (
            item != "Other" && <p className={'selectItem'} onClick={(e) => mulitpleSelect(e, item, "multiple")} key={index}>{item}</p>
          )
          )}
          {showMultiple && <ul className='list--tags' onClick={(e) => singlemulitpleSelectShow(false)} >{listItems.multiple && listItems.multiple.map((item, i) =>
            (<li key={i}>{item}</li>)
          )}</ul>}
        </div>
      </div>

      <div className='singleSelect'>
        <h1>Others</h1>
        <div>
          <span onClick={(e) => {setOther(false); setselectOther(false)} } > Nurse: </span>
          {!showother && !selectOther && selectList.map((item, index) =>
          (
            <p className={'selectItem'} onClick={(e) => otherSelect(e, item, "Other")} key={index}>{item}</p>
          )
          )}
          {showother && <ul className='list--tags' onClick={(e) => otherSelectShow(false)} >{listItems.Other && listItems.Other.map((item, i) =>
            (<li key={i}>{item}</li>)
          )}</ul>}
          {selectOther && <input onKeyDown={(e) => onEnterClick(e, "Other")} name="otherselect" placeholder='Notes'></input>}
        </div>
      </div>


      <div className='singleSelect'>
        <h1>YES/NO</h1>
        <p className={selectedYesNo == "yes" ? 'selectItem active': "selectItem"} onClick={(e) => yesNo(e, "yes")}>YES</p>
        <p className={selectedYesNo == "no" ? 'selectItem active': "selectItem"} onClick={(e) => yesNo(e, "no")}>NO</p>
        {selectyesNo &&
        <div>
          <span onClick={(e) => {setyesnoOther(false); setselectyesnoOther(false)} } > Nurse: </span>
          {!showyesnoother && !selectyesnoOther && selectList.map((item, index) =>
          (
            <p className={'selectItem'} onClick={(e) => otheryesnoSelect(e, item, "YesNo")} key={index}>{item}</p>
          )
          )}
          {showyesnoother && <ul className='list--tags' onClick={(e) => otherSelectyesnoShow(false)} >{listItems.YesNo && listItems.YesNo.map((item, i) =>
            (<li key={i}>{item}</li>)
          )}</ul>}
          {selectyesnoOther && <input onKeyDown={(e) => onEnterClick(e, "YesNo")} name="otherselect" placeholder='Notes'></input>}
        </div>}
        
      </div>


    </div>
  );
}

export default App;
