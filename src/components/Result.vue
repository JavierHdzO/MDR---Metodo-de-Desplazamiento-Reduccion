<template>
    
    <div 
    v-if="!isResolved"
    class="simbolos">
      <div class="flex">
        <label for="">Variables</label>
        <input v-model="variable"  type="text" @keypress.enter="addVariableList">
      </div>

      <div class="flex">
        <label for="">Terminales</label>
        <input v-model="terminal" type="text" @keyup.enter="addTerminalList">
      </div>
    </div>
    <br>
    <div class="flex cadenaW">
      <label for="">Cadena</label>
      <input v-model="cadenaW" type="text" placeholder="cadena W">
    </div>

    <br>
    <div class=" flex rules">
      <label for="">Regla de producción</label>
      <div >
        <input v-model='varProduction' id="varaible" type="text" placeholder="var">
        <span> => </span>
        <input v-model="rule" type="text" placeholder="producciones" @keyup.enter="addProductionRule">
        <button class="btn" @click="addProductionRule"> Agregar</button>
      </div>
    </div>

    <br>
    <button class="btn-own" @click="calculateMDR" >Calcular</button>

    <div class="flex">
      <p>V: {{ variablesList }}</p>
      <p>T: {{ terminalList }}</p>
      <p>S: {{ simbInicial }}</p>
    </div>

    <div>
      <table 
      v-if="isResolved" 
      class="table">
        <thead>
          <th> STACK</th>
          <th> ENTRY</th>
          <th> ACTION</th>
        </thead>
        <tbody>
          <tr 
            v-for="(mdr, index) in mdrResultVue" 
            :key="index"
            class="table table-dark table-striped"
            >
            <td> ${{mdr[0]}} </td>
            <td> {{mdr[1]}}$ </td>
            <td> {{mdr[2]}} </td>
          </tr>
        </tbody>
      </table>
      
    </div>


</template>

<script setup>
  import { ref, computed} from 'vue'

  import { splitString, sortStringResult } from '../helpers/getStrings'
  import { addVariable, addTerminal, addTerminalFromString } from '../helpers/addSimbols'
  import { desplaza } from '../helpers/include'
  import { action } from '../helpers/recursive'

  const variablesList       = ref([])
  const terminalList        = ref([])
  const cadenaW             = ref('id+id*id')
  const variable            = ref('')
  const terminal            = ref('id')
  const simbInicial         = ref('')
  const rule                = ref('id|E+E|E*E|(E)')//ref('id|E+E|E*E')  
  const varProduction       = ref('E')
  const mdrResultVue        = ref([])
  const productionRules     = {}
  const productionRulesAux  = {}
  const isResolved          = ref(false)
  let mdrResult             = []

  const addVariableList = (  ) => {
    variablesList.value = addVariable( variable.value, variablesList.value )
    variable.value = ''

  }

  const addTerminalList = ( ) => { 
    addTerminal( terminal.value, terminalList.value)
    terminal.value = ''
  }

  const addProductionRule = () => {
    
    if( rule.value === '' || varProduction.value === '') return

    const cadenas = splitString( rule.value )
    productionRules[varProduction.value.toUpperCase()] = cadenas
    productionRulesAux[varProduction.value.toUpperCase()] = rule.value
    
    variablesList.value = addVariable( varProduction.value, variablesList.value )

    rule.value          = ''
    varProduction.value = ''

  }


  const calculateMDR = () => {
    isResolved.value = false
    simbInicial.value = variablesList.value[0]

    terminalList.value =  addTerminalFromString( productionRulesAux, terminalList.value, variablesList.value )

    if( cadenaW.value === '' ) return

    let entry       = cadenaW.value
    let stack       = ''
    let result      = []
    let answer      = []
    let lastAnswer  = []
    let prevlAnswer = []

    mdrResult.push(['', entry, 'Shift'])
    let cont = 0
    

    while( cont < 1 ){


      if( entry !== "" || entry !== '$'){
      result  = desplaza( terminalList.value, entry )
        entry   = result[2]
        stack    = stack + result[1] 
        mdrResult.push([stack, entry, 'Shift'])
      }

    
      answer = action( stack, entry, productionRules, mdrResult, true )
      mdrResult = [...answer]
      
      
      lastAnswer = answer.at(-1)
      prevlAnswer = answer.at(-2)

      stack = lastAnswer[0]

      if( lastAnswer[0]  === prevlAnswer[0] ){
        cont++
      }

    }

    mdrResult = mdrResult.slice(0, mdrResult.length - 1)
    lastAnswer = mdrResult.at(-1)


    if( simbInicial.value === lastAnswer[0] ){
      mdrResult.push(['','','Cadena Aceptada'])
    }else{
      mdrResult.push(['', '', 'Cadena no valida'])
    }

    
    mdrResult = sortStringResult(mdrResult)
    mdrResultVue.value = mdrResult
    console.log( mdrResult )
    isResolved.value = true
  }

</script>

<style scoped>

  @import '../assets/bootstrap.min.css';

  .btn-own {
    background-color: #00BD7E;
    border-radius: 8px;
    color: #FFF;
    font-size: 18px;
    height: 35px;
    margin: 20px;
    width: 100px;

  }

  .flex {
    display: flex;
    flex-direction: column;
    margin: 20px;
  }
  .rules div {
    display: flex;
    flex-direction: row;
  }

  .rules div input {
    border-radius: 8px;
    font-size: 20px;
  }

  .rules div button {
    height: auto;
    border-radius: 8px;
    font-size: 18px;
    background-color: #00BD7E;
    color: #FFF;
  }

  #varaible {
    width: 40px;
  }

  .simbolos {
    display: flex;
    flex-direction: row;
  }

  .simbolos div input {
    border-radius: 8px;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .cadenaW {
    display: flex;
    flex-direction: column;
  }

  .cadenaW input {
    width: 300px;
    border-radius: 8px;
    font-size: 18px;
  }

</style>

