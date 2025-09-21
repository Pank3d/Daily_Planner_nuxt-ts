import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getFromLocalStorage, setToLocalStorage } from '../helpers';

// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
}

// Store key for localStorage
const TASKS_STORAGE_KEY = 'daily-planner-tasks';

// Generate unique ID from date and title
const generateTaskId = (title: string, date: Date): string => {
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 20); // Limit length

  const timestamp = Date.now(); // Add timestamp for uniqueness

  return `${dateStr}-${titleSlug}-${timestamp}`;
};

export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([]);
  const isLoaded = ref(false);

  // Load tasks from localStorage
  const loadTasksFromStorage = () => {
    if (isLoaded.value) return;

    const storedTasks = getFromLocalStorage<Task[]>(TASKS_STORAGE_KEY, []);
    // Convert string dates back to Date objects
    tasks.value = storedTasks.map(task => ({
      ...task,
      date: new Date(task.date),
      createdAt: new Date(task.createdAt)
    }));

    isLoaded.value = true;
  };

  // Save tasks to localStorage
  const saveTasksToStorage = () => {
    setToLocalStorage(TASKS_STORAGE_KEY, tasks.value);
  };

  // Initialize store
  const init = () => {
    if (!isLoaded.value) {
      loadTasksFromStorage();
    }
  };

  // Getters (computed)
  const allTasks = computed(() => {
    init();
    return tasks.value;
  });

  const completedTasks = computed(() =>
    allTasks.value.filter(task => task.completed)
  );

  const pendingTasks = computed(() =>
    allTasks.value.filter(task => !task.completed)
  );

  const todayTasks = computed(() => {
    const today = new Date();
    return allTasks.value.filter(task =>
      task.date.toDateString() === today.toDateString()
    );
  });

  const getTasksForDate = (date: Date) => {
    return allTasks.value.filter(task =>
      task.date.toDateString() === date.toDateString()
    );
  };

  const getTaskById = (id: string): Task | undefined => {
    return allTasks.value.find(task => task.id === id);
  };

  // Actions
  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>): Task => {
    init();

    const newTask: Task = {
      id: generateTaskId(taskData.title, taskData.date),
      title: taskData.title,
      description: taskData.description,
      date: taskData.date,
      completed: false,
      createdAt: new Date()
    };

    tasks.value.push(newTask);
    saveTasksToStorage();

    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>): Task | null => {
    init();

    const taskIndex = tasks.value.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      console.error(`Task with id ${id} not found`);
      return null;
    }

    const currentTask = tasks.value[taskIndex];
    if (currentTask) {
      tasks.value[taskIndex] = { ...currentTask, ...updates };
      saveTasksToStorage();
      return tasks.value[taskIndex];
    }

    return null;
  };

  const deleteTask = (id: string): boolean => {
    init();

    const taskIndex = tasks.value.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      console.error(`Task with id ${id} not found`);
      return false;
    }

    tasks.value.splice(taskIndex, 1);
    saveTasksToStorage();

    return true;
  };

  const toggleTaskCompletion = (id: string): Task | null => {
    init();

    const task = tasks.value.find(task => task.id === id);

    if (!task) {
      console.error(`Task with id ${id} not found`);
      return null;
    }

    return updateTask(id, { completed: !task.completed });
  };

  const clearAllTasks = (): void => {
    init();
    tasks.value = [];
    saveTasksToStorage();
  };

  const clearCompletedTasks = (): void => {
    init();
    tasks.value = tasks.value.filter(task => !task.completed);
    saveTasksToStorage();
  };

  return {
    // State
    tasks: allTasks,

    // Getters
    completedTasks,
    pendingTasks,
    todayTasks,

    // Methods
    getTasksForDate,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearAllTasks,
    clearCompletedTasks,

    // Utility
    loadTasksFromStorage,
    saveTasksToStorage,
    init
  };
});