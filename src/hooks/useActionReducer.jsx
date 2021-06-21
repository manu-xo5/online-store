import { useMemo, useReducer } from 'react';

const createActions = (actionsMap, dispatch) => {
  const myActions = {};
  for (const actionName of Object.keys(actionsMap)) {
    myActions[actionName] = (payload) => {
      dispatch({
        type: actionName,
        payload,
      });
    };
  }
  return myActions;
};

const actionReducer = (actionsMap) => (state, action) => {
  const { type, payload } = action;
  console.log(action);
  const actionFn = actionsMap[type];

  if (!actionFn) throw Error(`Unsupported Action type (${type})`);

  return actionFn(payload, state);
};

const useActionReducer = (actionsMap, initialArgs) => {
  const [state, dispatch] = useReducer(actionReducer(actionsMap), initialArgs);
  const actions = useMemo(
    () => createActions(actionsMap, dispatch),
    [actionsMap]
  );

  return {
    state,
    actions,
  };
};

export { useActionReducer };
