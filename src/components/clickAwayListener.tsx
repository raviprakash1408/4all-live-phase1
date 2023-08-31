import * as React from 'react';

interface ClickAwayListenerProps {
   onClickAway : (event: React.MouseEvent<Document, MouseEvent>) => void;
}

function ClickAwayListener(props: React.PropsWithChildren<ClickAwayListenerProps>) {
 
    const anchorRef = React.useRef<HTMLDivElement>(null);

  

    const handleClose =   React.useCallback((event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

      props.onClickAway(event)
    },[props]);

 React.useEffect(() => {
        document.addEventListener('mousedown', handleClose);
        return () => {
            document.removeEventListener('mousedown', handleClose);
        };
    }, [handleClose]);
    return ( 
        <div ref={anchorRef}>
            {props.children}
            </div>
     );
}

export default ClickAwayListener;