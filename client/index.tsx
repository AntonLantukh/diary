import React from 'react';
import ReactDOM from 'react-dom';

import App, {Bool} from './App';

console.log(Bool.False);

ReactDOM.hydrate(<App {...{name: 'Anton'}} />, document.querySelector('#root'));
