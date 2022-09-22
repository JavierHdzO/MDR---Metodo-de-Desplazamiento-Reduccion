export const addVariable = ( variable, variablesList )=>{
    const variableAux = variable.trim().toUpperCase()
    if(variableAux === '' ||  variablesList.includes( variableAux )) return variablesList
    variablesList.push( variableAux )

    return variablesList

}


export const addTerminal = (terminal, terminalList) => {
    const terminalAux = terminal.trim().toLowerCase()
    if( terminalAux === '' || terminalList.includes( terminalAux ) ) return terminalList
    terminalList.push( terminalAux )

    return terminalList
}

export const addTerminalFromString = ( productionRules = {}, terminalList = [], variableList = [] ) => {

    const keys = Object.keys(productionRules)
    const terminal = new Set( terminalList )
    

    for (let i = 0; i < keys.length; i++) {
        let body = productionRules[keys]

        let regexp
        body = body.replace( /\|/g, '')

        for (let j = 0; j < keys.length; j++) {
            
            regexp =new RegExp(keys[i], 'g')
            body = body.replace( regexp, '')
            
        }

        for (let k = 0; k < terminalList.length; k++) {
            regexp = new RegExp(terminalList[k], 'g')
            body = body.replace(regexp, '')  
        }

        for (let k = 0; k < variableList.length; k++) {
            regexp = new RegExp(variableList[k], 'g')
            body = body.replace(regexp, '')  
        }

        for (let j = 0; j < body.length; j++) {
            terminal.add(body[j])
        }
        
    }
    
    return [...terminal]

}