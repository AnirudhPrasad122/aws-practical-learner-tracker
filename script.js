const tasks = document.querySelectorAll(".task input");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const resetButton = document.getElementById("resetButton");

function updateProgress() {

    const totalTasks = tasks.length;

    let completedTasks = 0;

    tasks.forEach((task, index) => {

        if (task.checked) {
            completedTasks++;
        }

        localStorage.setItem(
            `aws-task-${index}`,
            task.checked
        );
    });

    const percentage =
        Math.round((completedTasks / totalTasks) * 100);

    progressText.textContent = `${percentage}%`;

    progressFill.style.width = `${percentage}%`;
}

function loadProgress() {

    tasks.forEach((task, index) => {

        const saved =
            localStorage.getItem(`aws-task-${index}`);

        task.checked = saved === "true";
    });

    updateProgress();
}

tasks.forEach((task) => {

    task.addEventListener("change", updateProgress);

});

resetButton.addEventListener("click", () => {

    tasks.forEach((task, index) => {

        task.checked = false;

        localStorage.removeItem(
            `aws-task-${index}`
        );

    });

    updateProgress();
});

loadProgress();