
export const splitString = ( rule = '' ) => {

    const ruleAux = rule.trim().replace( new RegExp(' ','ig'),'')

    if ( ruleAux === '') return []

    const cadena = ruleAux.split('|')

    return cadena
}

export const sortStringResult = ( mdrResults = []) => {

    for (let i = 0; i < mdrResults.length - 1; i++) {
        
        mdrResults[i][2] = mdrResults[i+1][2]

    }

    return mdrResults.slice(0, mdrResults.length -1)
}