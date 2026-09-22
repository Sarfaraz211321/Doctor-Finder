// Date formatting utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString();
};
