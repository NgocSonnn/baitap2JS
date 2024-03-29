const KEY_TASK_LIST = 'tasks';
let allTask = JSON.parse(localStorage.getItem(KEY_TASK_LIST)) || [];

function addTask(taskName, createBy) {
    const task = {
        taskName: taskName,
        createBy: createBy,
        id: new Date().getTime(),
        isDone: false,
    };
    allTask.push(task);
    localStorage.setItem(KEY_TASK_LIST, JSON.stringify(allTask));
}


function renderTask() {
    const tbodyElement = document.querySelector(".js-tbody-task-app");
    let bodyTableHtml = ``;

    allTask.forEach((task) => {
        bodyTableHtml += `
        <tr class="${task.isDone ? "task--done" : ""}">
                        <td>Task ${task.taskName}</td>
                        <td>${task.createBy}</td>
                        <td>
                            <button onclick="doneTaskById(${task.id})">Done</button>
                        </td>
                        <td>
                            <button onclick="deleteTaskById(${task.id})"> Delete</button>
                        </td>
                    </tr>
        `
    })
    tbodyElement.innerHTML = bodyTableHtml;

}
function deleteTaskById(taskId) {
    allTask = allTask.filter((task) => task.id !== taskId);
    localStorage.setItem(KEY_TASK_LIST, JSON.stringify(allTask));
    renderTask();
}

function doneTaskById(taskId) {
    const indexTaskMakeDone = allTask.findIndex((task) => task.id === taskId);
    if (indexTaskMakeDone !== -1) {
        allTask[indexTaskMakeDone] = {
            ...allTask[indexTaskMakeDone],
            isDone: true,
        };
        renderTask();
        localStorage.setItem(KEY_TASK_LIST, JSON.stringify(allTask));
    }
}

function handleAddTask(event) {
    event.preventDefault();
    const inputTaskEleName = document.querySelector(".js-input-task-name");
    const inputTaskEleCreator = document.querySelector(".js-input-task-creator");
    addTask(inputTaskEleName.value, inputTaskEleCreator.value);


    renderTask();
    inputTaskEleName.value = "";
    inputTaskEleCreator.value = "";
}

function main() {
    const formInputTaskEle = document.querySelector(".js-form-task");
    formInputTaskEle.addEventListener('submit', handleAddTask);
    renderTask();
}
main();