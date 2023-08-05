/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    return all.filter((todo) => todo.dueDate == today);
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let displayList = "";
    list.forEach((todo) => {
      const { title, dueDate, completed } = todo;

      if (dueDate < today) {
        displayList += `[ ] ${title} ${dueDate}\n`;
      } else if (dueDate === today) {
        displayList += `[${completed ? "x" : " "}] ${title}\n`;
      } else {
        displayList += `[ ] ${title} ${dueDate}\n`;
      }
    });
    displayList = displayList.trim();

    return displayList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
