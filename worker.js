let counter = 0;

self.onmessage = function(e) {
  const action = e.data;

  // Lol business logic
  switch (action.type) {
    case 'INCREMENT_REQ':
      counter += 1;
      self.postMessage({
        type: 'INCREMENT_RES',
        count: counter
      });
      break;
    case 'DECREMENT_REQ':
      counter -= 1;
      self.postMessage({
        type: 'DECREMENT_RES',
        count: counter
      });
      break;
  }
};

self.postMessage({
  type: 'INIT_COMPLETE',
  count: counter
});

console.info('Worker initialisation complete');
