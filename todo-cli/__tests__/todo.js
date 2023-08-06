/* eslint-disable no-undef */
let todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todo test cases", () => {
  beforeAll(() => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    [
      {
        title: "Complete assignment",
        completed: false,
        dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
          "en-CA",
        ),
      },
      {
        title: "Go for shopping",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Complete project",
        completed: false,
        dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleDateString(
          "en-CA",
        ),
      },
    ].forEach(add);
  });
  test("Add new todo", () => {
    expect(all.length).toEqual(3);

    add({
      title: "Take the test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("Todo mark as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Test for overdue", () => {
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: new Date(today).getTime() - 1 * 24 * 60 * 60 * 1000,
    });

    const overdueItems = overdue();
    expect(overdueItems).not.toContain(all[0]);
  });

  test("Test due today", () => {
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Due Today Todo",
      completed: false,
      dueDate: today,
    });

    const dueTodayItems = dueToday();
    expect(dueTodayItems).not.toContain(all[0]);
  });

  test("Test for due later", () => {
    add({
      title: "Due Later Todo",
      completed: false,
      dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });

    const dueLaterItems = dueLater();
    expect(dueLaterItems).toContain(all[0]);
  });
});
