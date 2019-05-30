export function updateAction(currentUser, isAuthed) {
  currentUser = currentUser || {};
  isAuthed = isAuthed || false;
  return {type: 'currentUserUpdate', 
          payload: {currentUser, isAuthed}, 
        };
}