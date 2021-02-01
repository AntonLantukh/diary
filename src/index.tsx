import React from 'react';
import ReactDOM from 'react-dom';

import App, {Bool} from './App';

console.log(Bool.False);

ReactDOM.render(<App {...{name: 'Anton'}} />, document.querySelector('#root'));
