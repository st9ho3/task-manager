import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4();
const INITIAL_STATE = {
  tasks: [],
  newTag: "",
  task: {
    id: uniqueId,
    title: '',
    description: '',
    status: 'Status', // Default status is "Status"
    priority: 'Priority', // Default priority is "low"
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    assignees: [], // Can be set to the current user or remain null if not assigned
    tags: [],
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
    case 'SET_FIELD':
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: [action.value],
        },
      };
    case 'ADD_VALUE':
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: [...state.task?.[action.field], action.payload],
        },
      };
    case 'REMOVE_VALUE':
      return {
        ...state,
        task: {
          ...state.task,
          [action.field]: action.payload,
        },
      };
    case 'SELECT_DATE':
      return {
        ...state,
        task: {
          ...state.task,
          dueDate: action.payload
        }
      }
    case 'UPDATE_TASKS':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      }
    case 'RESET_FORM':
      return {
        ...state,
        task: INITIAL_STATE.task,
      };
      case 'SET_TAG':
      return {
        ...state,
          [action.field]: [action.value]
        }
    case 'RESET_TAG':
      return {
        ...state,
        newTag: INITIAL_STATE.newTag,
      };
    default:
      return state;
  }
};