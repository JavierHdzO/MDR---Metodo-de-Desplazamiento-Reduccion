export const desplaza = ( terminalList = [], entry = '', miResults ) => {
    
    

    let subCadenaW      = ''
    let cadenaW      = ''
    for (let i = 0; i < terminalList.length; i++) {
        
        
         if(entry.startsWith(terminalList[i])){

            subCadenaW  = entry.substring(0, terminalList[i].length )
            cadenaW     = entry.substring( terminalList[i].length  )

            return [i, subCadenaW, cadenaW]
         }
        
    }

    subCadenaW  = entry.substring(0, 1)
    cadenaW     = entry.substring( subCadenaW.length )

    return [-1, subCadenaW, cadenaW]
    
}


