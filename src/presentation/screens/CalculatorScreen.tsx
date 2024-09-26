import React from 'react'
import { View, Text } from 'react-native'
import { styles, colors } from '../../config/theme/app-theme';
import { CalculatorButton } from '../components/CalculatorButton'
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreen = () => {
    const {
        number, 
        prevNum,
        prevResult,
        formula,
        result,

        buildNumber, 
        clear, 
        del,
        toggleSign,
        divideOp,
        multiplyOp,
        subtractOp,
        addOp,
        calculateResult
    } = useCalculator()

  return (
    <View style={styles.calculatorContainer}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 5}}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.mainResult}>
                {formula}
            </Text>
            {
                (formula === prevNum ) ? <Text style={styles.subResult}> </Text>:
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subResult}>
                    {prevNum}
                    {result}
                </Text>
            }
            
        </View>

        <View style={styles.row}>
            <CalculatorButton onPress={clear}   label='C'   color={colors.lightGray} isBlackText/>
            <CalculatorButton onPress={toggleSign} label='+/-' color={colors.lightGray} isBlackText/>
            <CalculatorButton onPress={del} label='del' color={colors.lightGray} isBlackText/>
            <CalculatorButton onPress={divideOp}   label='/'   color={colors.orange}/>
        </View>
        <View style={styles.row}>
            <CalculatorButton onPress={()=>buildNumber('7')} label='7'/>
            <CalculatorButton onPress={()=>buildNumber('8')} label='8'/>
            <CalculatorButton onPress={()=>buildNumber('9')} label='9'/>
            <CalculatorButton onPress={multiplyOp} label='x' color={colors.orange}/>
        </View>
        <View style={styles.row}>
            <CalculatorButton onPress={()=>buildNumber('4')} label='4'/>
            <CalculatorButton onPress={()=>buildNumber('5')} label='5'/>
            <CalculatorButton onPress={()=>buildNumber('6')} label='6'/>
            <CalculatorButton onPress={subtractOp} label='-' color={colors.orange}/>
        </View>
        <View style={styles.row}>
            <CalculatorButton onPress={()=>buildNumber('1')} label='1'/>
            <CalculatorButton onPress={()=>buildNumber('2')} label='2'/>
            <CalculatorButton onPress={()=>buildNumber('3')} label='3'/>
            <CalculatorButton onPress={addOp} label='+' color={colors.orange}/>
        </View>
        <View style={styles.row}>
            <CalculatorButton onPress={()=>buildNumber('0')} label='0' isDoubleSize/>
            <CalculatorButton onPress={()=>buildNumber('.')} label='.'/>
            <CalculatorButton onPress={calculateResult} label='=' color={colors.orange}/>
        </View>
    </View>
  )
}
