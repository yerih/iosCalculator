import React, { useEffect, useRef, useState } from 'react'

enum Operator{
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '/',
}


export const useCalculator = () => {

  const [number, setNumber] = useState('0')
  const [prevNum, setPrevNum] = useState('0')
  const [result, setResult] = useState('')
  const [formula, setFormula] = useState('')
  const [prevResult, setPrevResult] = useState('')

  
  const lastOperation = useRef<Operator>()

  const buildNumber = (numberString: string) => {
    if(number.includes('.') && numberString === '.') return 
    // if(number.includes('-') && numberString === '-') return 
    
    if(number.startsWith('0'))
      if(number.length <= 1 && numberString != '.'){
        setNumber(numberString)
        return
      }
  
    if(number.startsWith('-0') && !number.includes('.')){
      if(numberString === '0' || numberString != '.') return
    }

    setNumber(number+numberString)
    
  }  

  const clear = () => {
    setNumber('0'); setPrevNum('0'); setFormula('0'); setPrevResult('')
    lastOperation.current = undefined; 
  }
  const del        = () => {
    if(number.includes('-'))
      setNumber( number.length == 2 ? '0':number.slice(0,-1))
    else
      setNumber( number.length == 1 ? '0':number.slice(0,-1))
  }
  const toggleSign = () => {
    if(number.includes('-')) setNumber(number.replace('-', ''))
    else setNumber('-'+number)
  }

  const setLastNumber = () => {
    if(number.endsWith('.')) setPrevNum(number.slice(0,-1))
    else setPrevNum(number)
    setNumber('0')
  }

  const divideOp = () => {
    setLastNumber()
    lastOperation.current = Operator.divide
  }
  const multiplyOp = () => {
    setLastNumber()
    lastOperation.current = Operator.multiply
  }
  const subtractOp = () => {
    if(number === '0')
      buildNumber('-')
    else{
      setLastNumber()
      lastOperation.current = Operator.subtract
    }
  }
  const addOp = () => {
    setLastNumber()
    lastOperation.current = Operator.add
  }

  const calculateResult = (): number => {
    const result = calculateSubresult(formula)
    setFormula(`${result}`)
    lastOperation.current = undefined
    setPrevNum('')
    setPrevResult('')
  }


  const calculateSubresult = (toCalc: String): number => {
    const [first, op, second] = toCalc.split(' ')
    // const [first, op, second] = formula.split(' ')
    const num1 = Number(first)
    const num2 = Number(second)
    switch(op){
      case Operator.divide:   return num1/num2
      case Operator.multiply: return num1*num2
      case Operator.subtract: return num1-num2
      case Operator.add:      return num1+num2
      default: return num2//throw new Error('calculateResult: Operation not implemented')
    }
  }

  useEffect( () => {
    // if(lastOperation.current === undefined)
    if(lastOperation.current){
      const firstPart = formula.split(' ')[0]
      let f = `${firstPart} ${lastOperation.current} ${number}`
      setFormula(f)
      setPrevResult(`${calculateSubresult(f)}`)
    }
    else 
        setFormula(number)
  }, [number])
  
  
  return {
    //Properties
    number,
    prevNum,
    prevResult,
    formula,
    result,

    //Methods
    buildNumber,
    clear,
    del,
    toggleSign,
    divideOp,
    multiplyOp,
    subtractOp,
    addOp,
    calculateResult,
  }
}

