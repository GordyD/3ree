// This is a tiny UUID generator to replace node-uuid!
// See: https://gist.github.com/jed/982883
function uuid(a){
  /*eslint-disable */
  return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
  /*eslint-enable */
}


export function hasLocalStorage() {
  return (!!window.localStorage);
}

export function getUserId() {
  return window.localStorage.getItem('userId');
}

export function setUserId() {
  let id = uuid();
  window.localStorage.setItem('userId', id);
  return id;
}

export function getOrSetUserId() {
  if (!hasLocalStorage()) {
    return 'baseUser';
  } else {
    let userId = getUserId();
    return (userId) ? userId : setUserId();
  }
}