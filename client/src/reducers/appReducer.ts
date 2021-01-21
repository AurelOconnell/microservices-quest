type AppState = {
  showAddForm: boolean;
  successMessage: string;
};

export type Action =
  | {
      type: "TOGGLE_SHOW_ADD_FORM";
    }
  | {
      type: "WILDER_ADDED";
      newWilder: { name: string };
    };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_SHOW_ADD_FORM":
      return { ...state, showAddForm: !state.showAddForm };
    case "WILDER_ADDED":
      return {
        ...state,
        showAddForm: false,
        successMessage: `The wilder ${action.newWilder.name} has been successfully added`,
      };
    default:
      return state;
  }
};

export default appReducer;
