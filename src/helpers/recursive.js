export const action = ( stack = '',entry,  productionRules = {}, mdrResults, stop ) => {
    let result = []
    let answer = []
    let entrada = entry


    if( !stop ) {
        console.log('STOP');
        return []
    }
    

    result = reduction(stack, entry, productionRules )


    if( result.length !== 0 ) {
        mdrResults.push( result )
        answer = action( result[0], entrada, productionRules, mdrResults, true ) 
    }else{
     
        answer = action( result[0], entrada, productionRules,mdrResults, false ) 

    }
    
    return mdrResults

}


const reduction = (stack = '', entry ,productionRules = {}) => {

    const keys      = Object.keys(productionRules)
    let body        = []

    for (let i = 0; i < keys.length; i++) {
        
        body    = productionRules[keys[i]]
        for (let j = 0; j < body.length; j++) {
            
            if( stack.includes( body[j] ) ){
                stack = stack.replace(body[j], keys[i] )

                return [stack, entry, `Reduce ${ keys[i] } -> ${body[j]}`]
            }   
        }  
    }

    return []


}