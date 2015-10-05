import socketClient from 'socket.io-client';

export function setupRealtime(store, actions) {
  const io = socketClient();

  io.on('event-change', (change) => {
    let state = store.getState();
    if (!change.old_val) {
      if (change.new_val.userId !== state.userId) {
        store.dispatch(actions.addEventSuccess(change.new_val));
      }
    }
    // } else if (!change.new_val) {
    //   store.dispatch(actions.deleteEventSuccess(change.old_val));
    // } else {
    //   store.dispatch(actions.editEventSuccess(change.new_val));
    // }
  });

  return io;
}