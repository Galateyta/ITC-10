export function updateAction(currentUser) {
  currentUser = currentUser || {};
  return {type: 'currentUserUpdate', 
          payload: {currentUser}, 
        };
}