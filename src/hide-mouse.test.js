import Rx from 'rxjs';
import { createHideMouse } from './hide-mouse.js';

const subject = new Rx.Subject();
const mouseMoveSource = Rx.Observable.from(subject);

const wait = ms => new Promise(r => setTimeout(r, ms));

function prepareHideMouse(timeout = 100) {

	const handleMouseMove = jest.fn();
	const handleMouseMoveEndTimeout = jest.fn();

	const hideMouse = createHideMouse({ 
			mouseMoveSource, 
			handleMouseMove, 
			handleMouseMoveEndTimeout
	})({ timeout })
	
	return { subject, mouseMoveSource, handleMouseMove, handleMouseMoveEndTimeout, hideMouse };
}


test('deactivate sets active to false', () => {

	const { hideMouse } = prepareHideMouse();

	hideMouse.deactivate();

    expect(hideMouse.active).toBe(false);  
});

test('activate sets active to true', () => {

	const { hideMouse } = prepareHideMouse();

    hideMouse.deactivate();
    hideMouse.activate();

    expect(hideMouse.active).toBe(true);  
});

test('handleMouseMove is called every time when mouseMoves', () => {

	const { mouseMoveSource, handleMouseMove } = prepareHideMouse();
	
	mouseMoveSource.next(1);
	mouseMoveSource.next(2);
	mouseMoveSource.next(3);

  	expect(handleMouseMove).toHaveBeenCalledTimes(3);
});

test('handleMouseMoveEndTimeout is called when time has passed', async () => {
 
	const { mouseMoveSource, handleMouseMoveEndTimeout } = prepareHideMouse();

    mouseMoveSource.next(1);
    mouseMoveSource.next(2);
    await wait(200);

    expect(handleMouseMoveEndTimeout).toHaveBeenCalledWith(2);
});

test('handleMouseMoveEndTimeout is not called when time has not passed', async () => {

	const { mouseMoveSource, handleMouseMoveEndTimeout } = prepareHideMouse();

    mouseMoveSource.next(1);
    await wait(50);

    expect(handleMouseMoveEndTimeout).toHaveBeenCalledTimes(0);
});

test('handleMouseMoveEndTimeout is not called when hideMouse is deactivated', async () => {

	const { mouseMoveSource, hideMouse, handleMouseMoveEndTimeout } = prepareHideMouse();
			 
    hideMouse.deactivate();

    mouseMoveSource.next(1);
	await wait(200);

    expect(handleMouseMoveEndTimeout).toHaveBeenCalledTimes(0);
});

test('handleMouseMoveEndTimeout is not called when hideMouse is killed', async () => {

	const { mouseMoveSource, hideMouse, handleMouseMoveEndTimeout } = prepareHideMouse();
			 
    hideMouse.kill();

    mouseMoveSource.next(1);
	await wait(200);

    expect(handleMouseMoveEndTimeout).toHaveBeenCalledTimes(0);
});

test('handleMouseMove is not called when hideMouse is killed', async () => {

	const { mouseMoveSource, hideMouse, handleMouseMove } = prepareHideMouse();
			 
    hideMouse.kill();

    mouseMoveSource.next(1);
	await wait(200);

    expect(handleMouseMove).toHaveBeenCalledTimes(0);
});