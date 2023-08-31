import React from "react"

// backdrop props interface
interface BackdropProps {
    children: React.ReactNode
    renderafter?: boolean|string

}
export const Backdrop = (props:BackdropProps)=>{
    // state for rendering backdrop
    const [render, setRender] = React.useState<boolean>(false)

    // render backdrop after some time
    React.useEffect(()=>{
        if(props.renderafter){
            setTimeout(()=>{
                // setRender(true)
            },2000)
        }
        else{
            // setRender(true)
        }   
    },[props.renderafter])
return render && (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'

      }}>
        <div style={{
            width: '50%',
            height: '50%',
            backgroundColor: 'rgba(1,25,52,1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',

            
        }}>
        {props.children}

        </div>
      </div>
)

}