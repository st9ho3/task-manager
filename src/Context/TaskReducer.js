const INITIAL_STATE = {
    tasks: [], // An array to hold multiple task objects
    task: {
      id: null,
      title: "",
      description: "",
      status: "Status", // Default status is "Status"
      priority: "low", // Default priority is "low"
      dueDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      assignee: null, // Can be set to the current user or remain null if not assigned
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
    }
  };
  
  export default INITIAL_STATE;

  export const taskReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD' :
        return {
          ...state,
          task: {
            ...state.task,
            [action.field]:[action.value]
          }
        }
      case 'RESET_FORM' :
        return {
          ...state,
          task:INITIAL_STATE.task
        }
    }
    
  }