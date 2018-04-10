import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';

export const createHideMouse = ({ 
    mouseMoveSource, 
    handleMouseMove, 
    handleMouseMoveEndTimeout 
}) => ({ timeout = 2000 } = {}) => {

    //state
    let active = true;
    
    const mouseMoveEndSource = mouseMoveSource
                                .bufferTime(200)
                                .pairwise()
                                // continue only if in the current buffer window no events occur -> mouse stopped moving
                                .filter(([previous, current]) => current.length === 0)
                                // get the latest event of the previous buffer window
                                .map(([previous, current]) => previous.slice(-1)[0])
                                // continue only if there was a previous event
                                .filter(event => event);


    // the mouse has not been moved for 'timeout' ms
    const mouseMoveEndTimeout$ = mouseMoveEndSource
                                    .merge(mouseMoveSource)
                                    .debounceTime(timeout)
                                    .filter(() => active)
                                    .subscribe(handleMouseMoveEndTimeout)
    
    // the mouse is moving 
    // TODO emit only once after moving again
    const mouseMove$ = mouseMoveSource.subscribe(handleMouseMove);

    return {
        get active() { return active },
        activate: () => active = true,
        deactivate: () => active = false,
        kill: () => {
            mouseMoveEndTimeout$.unsubscribe();
            mouseMove$.unsubscribe();
        }
    }
}
