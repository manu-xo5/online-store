type ActionCreator<Type, Fn = (payload) => void> = {
  [x in keyof Type]: Fn;
};

function useActionReducer<ActionMap, Init>(
  actionsMap: ActionMap,
  initialArgs: Init
): {
  state: Init;
  actions: ActionCreator<ActionMap>;
};

export { useActionReducer };
