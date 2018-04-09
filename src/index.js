import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { createHideMouse } from './hide-mouse';

export default function hideMouse({ el = document.body, hideAfter } = {}) {

    if(!window.getComputedStyle(el).height) {
        throw new Error('[hide-mouse] the element needs to have an explicit height css property defined')
    }

    const mouseMoveSource = Observable.fromEvent(el, 'mousemove');

    const handleMouseMove = () => el.style.cursor = 'auto';
    const handleMouseMoveEndTimeout = () => el.style.cursor = 'none';

    return createHideMouse({ 
        mouseMoveSource, 
        handleMouseMove, 
        handleMouseMoveEndTimeout
     })({ timeout: hideAfter });
}