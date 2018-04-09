# hide-mouse
Hides the cursor after a specific time without movement.

![Demo as animated Gif](https://github.com/matthiasklan/hide-mouse/blob/master/demo.gif)

## Install

`npm install hide-mouse`

## Usage

To hide the cursor pass the desired DOM-element as el property and define the timeout as the hideAfter property in ms.

```javascript
import hideMouse from 'hide-mouse';

const el = document.getElementById('hide-area');
const hm = hideMouse({ el, hideAfter: 2000 });
```

It is also possible to temporarily deactiave the behavior by using the `deactivate` method.

```javascript
hm.deactivate();
// ...
hm.activate();
```

To completely unsubscribe and turn off the service use the `kill` method.

```javascript
hm.kill();
```

## Example

To start the example run `npm run example` and visit http://localhost:1234

## Build

To generate a new build run `npm run build`, which will fail if tests won't pass. You can manually run the tests by using `npm test`.
