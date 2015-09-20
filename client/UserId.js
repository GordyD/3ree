import uuid from 'node-uuid';

export function hasLocalStorage() {
  return (!!window.localStorage);
}

export function getUserId() {
  return window.localStorage.getItem('userId');
}

export function setUserId() {
  let id = uuid.v1();
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