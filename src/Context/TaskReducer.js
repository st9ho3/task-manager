const INITIAL_STATE = {
  tasks: [], // An array to hold multiple task objects
  task: {
    id: null,
    title: "",
    description: "",
    status: "Status", // Default status is "Status"
    priority: "Priority", // Default priority is "low"
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    assignees: [], // Can be set to the current user or remain null if not assigned
    tags: {
      tagsStore: [],
      taskTags: []
    },
    attachments: [],
    subtasks: [],
    comments: [],
    recurring: {
      isRecurring: false, // Indicates if the task repeats
      frequency: null, // Could be "daily", "weekly", "monthly", etc.
    },
    completedAt: null,
    estimatedTime: null,
    reminder: null, // Could be a timestamp or a specific date/time
  },
};

export default INITIAL_STATE;

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: [action.value],
        },
      };
    case "ADD_VALUE":
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: [...state.task?.[action.field], action.payload],
        },
      };
    case "REMOVE_VALUE":
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: action.payload,
        },
      };
      case "ADD_TAG":
        return {
          ...state,
          task: {
            ...state.task,
            tags: {
              ...state.task.tags,
              tagsStore: [...state.task.tags.tagsStore, action.payload],
            },
          },
        };
    case "RESET_FORM":
      return {
        ...state,
        task: INITIAL_STATE.task,
      };
    default:
      return state;
  }
};