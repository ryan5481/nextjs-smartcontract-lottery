import {useMoralis} from "react-moralis"
import {useEffect} from "react"


// useEffect takes a two paramaters: a function and a optionally a dependency array.
// useEffect keeps checking for changes in the dependency array and calls a function ad rerenders the frontend

export default function ManualHeader(){

    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    useEffect(() => {
        if(isWeb3Enabled) return
        if(typeof window !== "undefined")
            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }
        //enableWeb3()
    }, [isWeb3Enabled])
    // automatically runs on load and 
    // runs checking value

    useEffect(() => {Moralis.onAccountChanged((account) => {
        console.log(`Switched account to ${account}`)
        if(account == null) {
            window.localStorage.removeItem("connected")
            deactivateWeb3()
            console.log("Null account found")
        }
    })}, [])
    
    return (<div>
        {account ? (
            <div>
                Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}
            </div>
        ) : (
        <button
            onClick={async () => {
                await enableWeb3()
                if(typeof window !== "undefined")
                    window.localStorage.setItem("connected", "injected")
            }}
            disabled={isWeb3EnableLoading}
                >connect wallet
                </button>)}
         
    </div>)
}