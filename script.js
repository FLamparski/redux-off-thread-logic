const api = new Worker('worker.js');
console.log('We have a worker', api);

function reducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      waiting: true
    };
  }

  switch(action.type) {
    case 'INCREMENT_REQ':
    case 'DECREMENT_REQ':
      api.postMessage(action);
      return Object.assign({}, state, {waiting: true});
    case 'INCREMENT_RES':
    case 'DECREMENT_RES':
      return Object.assign({}, state, {waiting: false, counter: action.count});
    case 'INIT_COMPLETE':
      return Object.assign({}, state, {waiting: false, counter: action.count});
  }
}

const store = Redux.createStore(reducer);

function render() {
  const state = store.getState();
  // Where did these global variables come from?!
  // Explanation here: https://dev.to/buntine/dom-elements-with-ids-are-global-variables
  // Please don't do this in a real application
  num.disabled = dec.disabled = inc.disabled = state.waiting;
  num.value = state.counter;
}

store.subscribe(render);

api.onmessage = e => store.dispatch(e.data);

dec.onclick = e => store.dispatch({type: 'DECREMENT_REQ'});
inc.onclick = e => store.dispatch({type: 'INCREMENT_REQ'});
