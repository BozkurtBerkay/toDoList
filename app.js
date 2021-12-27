const taskInput = document.querySelector('#task');
const tasks = localStorage.getItem('tasks')?.length > 0 ? [...JSON.parse(localStorage.getItem('tasks'))] : [];

const TICK = 10004;

class Task {
    constructor(desc, done = false) {
        this.desc = desc;
        this.done = done;
    }
}
const newElement = () => {
    if (taskInput.value.length > 0) {
        $('#liveToastSuccess').toast('show');
        let task = new Task(taskInput.value, false);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload();
    }
    else {
        $('#liveToastError').toast('show')
    }
}
(async () => {
    const doneList = document.querySelector('#doneList');
    const didList = document.querySelector('#didList');

    const doneTaskHTML = (item) => {
        return `
        <li><p>${item.desc}</p><span>&#x2718;</span><span>&#x2714;</span></li>
    `;
    }

    const didTaskHTML = (item) => {
        return `
        <li><p>${item.desc}</p><span>&#x2718;</span></li> 
    `;
    }

    const getDoneTask = async (items) => {
        const filterTasks = items.filter(task => !task.done)
        doneList.innerHTML = filterTasks.map(task => doneTaskHTML(task)).join("");
    }
    const getDidTask = async (items) => {
        const filterTasks = items.filter(task => task.done)
        didList.innerHTML = filterTasks.map(task => didTaskHTML(task)).join("");
    }

    await getDoneTask(tasks);
    await getDidTask(tasks);

    const onClick = () => {
        for (const li of doneList.children) {
            for (const span of li.children) {
                span.addEventListener('click', () => setTask(li.firstChild.textContent, span.textContent));
            }
        }
        for (const li of didList.children) {
            for (const span of li.children) {
                span.addEventListener('click', () => setDoneTask(li.firstChild.textContent))
            }
        }
    }
    onClick()

    const setTask = (item, type) => {
        console.log(type.charCodeAt());
        let changeTask = [...tasks];
        const filterTask = changeTask.filter((task) => task.desc === item);
        type.charCodeAt() === TICK ? filterTask[0].done = true : changeTask = changeTask.filter((task) => task.desc !== item);
        localStorage.setItem('tasks', JSON.stringify(changeTask));
        location.reload();
    }

    const setDoneTask = (item) => {
        const changeTask = [...tasks];
        const filterTask = changeTask.filter((task) => task.desc === item);
        filterTask[0].done = false;
        localStorage.setItem('tasks', JSON.stringify(changeTask));
        location.reload();
    }
})()

