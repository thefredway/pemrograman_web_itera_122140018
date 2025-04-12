class Dashboard {
  constructor() {
    try {
      this.initElements();
      this.loadData();
      this.setupEventListeners();
      this.updateDateTime();
      this.loadWeather();
      this.pomodoroMode = "short";
      this.setPomodoroMode("short");
    } catch (error) {
      console.error("Dashboard initialization failed:", error);
    }
  }
  initElements() {
    this.scheduleContainer = document.getElementById("scheduleContainer");
    this.addScheduleBtn = document.getElementById("addScheduleBtn");
    this.todaySchedule = document.getElementById("todaySchedule");
    this.weeklySchedule = document.getElementById("weeklySchedule");
    this.scheduleModal = document.getElementById("scheduleModal");
    this.scheduleForm = document.getElementById("scheduleForm");
    this.cancelSchedule = document.getElementById("cancelSchedule");

    this.taskContainer = document.getElementById("taskContainer");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.taskFilter = document.getElementById("taskFilter");
    this.statusFilter = document.getElementById("statusFilter");
    this.taskModal = document.getElementById("taskModal");
    this.taskForm = document.getElementById("taskForm");
    this.cancelTask = document.getElementById("cancelTask");
    this.subjectFilter = document.getElementById("subjectFilter");

    this.timerDisplay = document.getElementById("timerDisplay");
    this.startTimer = document.getElementById("startTimer");
    this.pauseTimer = document.getElementById("pauseTimer");
    this.resetTimer = document.getElementById("resetTimer");
    this.shortMode = document.getElementById("shortMode");
    this.longMode = document.getElementById("longMode");
    this.todaySessions = document.getElementById("todaySessions");
    this.todayFocusTime = document.getElementById("todayFocusTime");

    this.quickNote = document.getElementById("quickNote");
    this.saveNote = document.getElementById("saveNote");

    this.datetime = document.getElementById("datetime");
    this.weather = document.getElementById("weather");
  }

  loadData() {
    this.schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    this.renderSchedules("today");

    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.renderTasks();
    this.updateSubjectFilter(); // Add this line to update subject filter on load

    const today = new Date().toISOString().split("T")[0];
    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    this.quickNote.value = notes[today] || "";

    const pomoStats = JSON.parse(localStorage.getItem("pomodoroStats")) || {};
    const todayStats = pomoStats[today] || { sessions: 0, focusTime: 0 };
    this.todaySessions.textContent = todayStats.sessions;
    this.todayFocusTime.textContent = todayStats.focusTime;
  }

  setupEventListeners() {
    this.addScheduleBtn.addEventListener("click", () =>
      this.showScheduleModal()
    );
    this.todaySchedule.addEventListener("click", () =>
      this.renderSchedules("today")
    );
    this.weeklySchedule.addEventListener("click", () =>
      this.renderSchedules("weekly")
    );
    this.scheduleForm.addEventListener("submit", (e) =>
      this.handleScheduleSubmit(e)
    );
    this.cancelSchedule.addEventListener("click", () =>
      this.hideScheduleModal()
    );

    this.addTaskBtn.addEventListener("click", () => this.showTaskModal());
    this.taskFilter.addEventListener("change", () => this.renderTasks());
    this.statusFilter.addEventListener("change", () => this.renderTasks());
    this.taskForm.addEventListener("submit", (e) => this.handleTaskSubmit(e));
    this.cancelTask.addEventListener("click", () => this.hideTaskModal());

    this.startTimer.addEventListener("click", () => this.startPomodoro());
    this.pauseTimer.addEventListener("click", () => this.pausePomodoro());
    this.resetTimer.addEventListener("click", () => this.resetPomodoro());
    this.shortMode.addEventListener("click", () =>
      this.setPomodoroMode("short")
    );
    this.longMode.addEventListener("click", () => this.setPomodoroMode("long"));

    this.saveNote.addEventListener("click", () => this.saveQuickNote());
  }

  showScheduleModal(editId = null) {
    if (editId) {
      document.getElementById("scheduleModalTitle").textContent =
        "Edit Jadwal Kuliah";
      const schedule = this.schedules.find((s) => s.id === editId);
      if (schedule) {
        document.getElementById("scheduleId").value = schedule.id;
        document.getElementById("courseName").value = schedule.courseName;
        document.getElementById("courseDay").value = schedule.day;
        document.getElementById("startTime").value = schedule.startTime;
        document.getElementById("endTime").value = schedule.endTime;
        document.getElementById("lecturer").value = schedule.lecturer || "";
      }
    } else {
      document.getElementById("scheduleModalTitle").textContent =
        "Tambah Jadwal Kuliah";
      document.getElementById("scheduleForm").reset();
      document.getElementById("scheduleId").value = "";
    }
    this.scheduleModal.classList.remove("hidden");
  }

  hideScheduleModal() {
    this.scheduleModal.classList.add("hidden");
  }

  handleScheduleSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("scheduleId").value;
    const courseName = document.getElementById("courseName").value;
    const day = document.getElementById("courseDay").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const lecturer = document.getElementById("lecturer").value;

    const schedule = {
      id: id || Date.now().toString(),
      courseName,
      day,
      startTime,
      endTime,
      lecturer,
    };

    if (id) {
      const index = this.schedules.findIndex((s) => s.id === id);
      if (index !== -1) {
        this.schedules[index] = schedule;
      }
    } else {
      this.schedules.push(schedule);
    }

    localStorage.setItem("schedules", JSON.stringify(this.schedules));
    this.renderSchedules();
    this.hideScheduleModal();
  }

  renderSchedules(view = "today") {
    this.scheduleContainer.innerHTML = "";

    if (this.schedules.length === 0) {
      this.scheduleContainer.innerHTML =
        '<p class="text-gray-400 text-center py-4">Tidak ada jadwal</p>';
      return;
    }

    if (view === "today") {
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const today = days[new Date().getDay()];
      const todaySchedules = this.schedules.filter((s) => s.day === today);

      if (todaySchedules.length === 0) {
        this.scheduleContainer.innerHTML = `<p class="text-gray-400 text-center py-4">Tidak ada jadwal untuk ${today}</p>`;
        return;
      }

      todaySchedules
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .forEach((schedule) => {
          this.scheduleContainer.appendChild(this.createScheduleCard(schedule));
        });
    } else {
      const daysOrder = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ];
      const schedulesByDay = {};

      daysOrder.forEach((day) => {
        schedulesByDay[day] = this.schedules
          .filter((s) => s.day === day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
      });

      daysOrder.forEach((day) => {
        if (schedulesByDay[day].length > 0) {
          const dayHeader = document.createElement("div");
          dayHeader.className = "font-medium text-blue-400 mb-2 mt-4";
          dayHeader.textContent = day;
          this.scheduleContainer.appendChild(dayHeader);

          schedulesByDay[day].forEach((schedule) => {
            this.scheduleContainer.appendChild(
              this.createScheduleCard(schedule)
            );
          });
        }
      });
    }
  }

  createScheduleCard(schedule) {
    const card = document.createElement("div");
    card.className =
      "bg-gray-700 rounded-lg p-3 flex justify-between items-start";

    const timeHtml = `
            <div class="text-sm font-mono bg-gray-600 px-2 py-1 rounded mr-3">
                ${schedule.startTime} - ${schedule.endTime}
            </div>
        `;

    const contentHtml = `
            <div class="flex-grow">
                <h4 class="font-medium">${schedule.courseName}</h4>
                ${
                  schedule.lecturer
                    ? `<p class="text-xs text-gray-400">${schedule.lecturer}</p>`
                    : ""
                }
            </div>
        `;

    const actionsHtml = `
            <div class="flex space-x-2">
                <button class="edit-schedule text-blue-400 hover:text-blue-300" data-id="${schedule.id}">
                    <iconify-icon icon="mdi:pencil" width="18"></iconify-icon>
                </button>
                <button class="delete-schedule text-red-400 hover:text-red-300" data-id="${schedule.id}">
                    <iconify-icon icon="mdi:trash-can" width="18"></iconify-icon>
                </button>
            </div>
        `;

    card.innerHTML = timeHtml + contentHtml + actionsHtml;

    card.querySelector(".edit-schedule").addEventListener("click", (e) => {
      e.stopPropagation();
      this.showScheduleModal(schedule.id);
    });

    card.querySelector(".delete-schedule").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Hapus jadwal ini?")) {
        this.schedules = this.schedules.filter((s) => s.id !== schedule.id);
        localStorage.setItem("schedules", JSON.stringify(this.schedules));
        this.renderSchedules();
      }
    });

    return card;
  }

  showTaskModal(editId = null) {
    if (editId) {
      document.getElementById("taskModalTitle").textContent = "Edit Tugas";
      const task = this.tasks.find((t) => t.id === editId);
      if (task) {
        document.getElementById("taskId").value = task.id;
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskSubject").value = task.subject;

        const deadlineDate = new Date(task.deadline);
        const formattedDeadline = deadlineDate.toISOString().slice(0, 16);
        document.getElementById("taskDeadline").value = formattedDeadline;

        document.getElementById("taskStatus").value = task.status;
        document.getElementById("taskNotes").value = task.notes || "";
      }
    } else {
      document.getElementById("taskModalTitle").textContent = "Tambah Tugas";
      document.getElementById("taskForm").reset();
      document.getElementById("taskId").value = "";

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 0, 0);
      document.getElementById("taskDeadline").value = tomorrow
        .toISOString()
        .slice(0, 16);
    }
    this.taskModal.classList.remove("hidden");
  }

  hideTaskModal() {
    this.taskModal.classList.add("hidden");
  }

  handleTaskSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("taskId").value;
    const title = document.getElementById("taskTitle").value;
    const subject = document.getElementById("taskSubject").value;
    const deadline = document.getElementById("taskDeadline").value;
    const status = document.getElementById("taskStatus").value;
    const notes = document.getElementById("taskNotes").value;

    const task = {
      id: id || Date.now().toString(),
      title,
      subject,
      deadline: new Date(deadline).toISOString(),
      status,
      notes,
      createdAt: id
        ? this.tasks.find((t) => t.id === id).createdAt
        : new Date().toISOString(),
    };

    if (id) {
      const index = this.tasks.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    } else {
      this.tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.updateSubjectFilter(); // Add this line to update subject filter when tasks change
    this.renderTasks();
    this.hideTaskModal();
  }

  renderTasks() {
    if (
      !this.taskContainer ||
      !this.taskFilter ||
      !this.subjectFilter ||
      !this.statusFilter
    ) {
      console.error("Required elements not found");
      return;
    }

    this.taskContainer.innerHTML = "";

    if (!this.tasks || this.tasks.length === 0) {
      this.taskContainer.innerHTML =
        '<p class="text-gray-400 text-center py-4">Tidak ada tugas</p>';
      return;
    }

    const timeFilter = this.taskFilter.value;
    const subjectFilter = this.subjectFilter ? this.subjectFilter.value : "all";
    const statusFilter = this.statusFilter.value;

    let filteredTasks = [...this.tasks];

    if (statusFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      );
    }

    if (timeFilter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        return taskDate >= today && taskDate < tomorrow;
      });
    } else if (timeFilter === "week") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        return taskDate >= today && taskDate < nextWeek;
      });
    }

    if (subjectFilter !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.subject === subjectFilter
      );
    }

    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    if (filteredTasks.length === 0) {
      this.taskContainer.innerHTML =
        '<p class="text-gray-400 text-center py-4">Tidak ada tugas dengan filter ini</p>';
      return;
    }

    filteredTasks.forEach((task) => {
      this.taskContainer.appendChild(this.createTaskCard(task));
    });
  }

  updateSubjectFilter() {
    const subjectFilter = document.getElementById("subjectFilter");
    if (!subjectFilter) return;

    // Filter out empty subjects and get unique values
    const subjects = [
      ...new Set(
        this.tasks.map((task) => task.subject).filter((subject) => subject)
      ),
    ];

    // Store current value to preserve selection if possible
    const currentValue = subjectFilter.value;

    // Clear and add default option
    subjectFilter.innerHTML = '<option value="all">Semua Mata Kuliah</option>';

    if (subjects.length === 0) {
      // Add a disabled option when no subjects exist
      subjectFilter.innerHTML +=
        '<option value="none" disabled>Tidak ada mata kuliah</option>';
    } else {
      // Add all available subjects
      subjects.forEach((subject) => {
        subjectFilter.innerHTML += `<option value="${subject}">${subject}</option>`;
      });
    }

    // Restore previous selection if it still exists
    if (currentValue === "all" || subjects.includes(currentValue)) {
      subjectFilter.value = currentValue;
    }
  }

  createTaskCard(task) {
    const card = document.createElement("div");
    card.className = "bg-gray-700 rounded-lg p-3";

    const deadlineDate = new Date(task.deadline);
    const now = new Date();
    const isOverdue = deadlineDate < now && task.status !== "completed";

    const statusClasses = {
      "not-started": "bg-gray-500",
      "in-progress": "bg-yellow-500",
      completed: "bg-green-500",
    };

    const statusText = {
      "not-started": "Belum",
      "in-progress": "Sedang",
      completed: "Selesai",
    };

    const deadlineText = deadlineDate.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium ${isOverdue ? "text-red-400" : ""}">${
      task.title
    }</h4>
                <span class="text-xs ${
                  statusClasses[task.status]
                } px-2 py-1 rounded">
                    ${statusText[task.status]}
                </span>
            </div>
            <div class="flex justify-between text-sm text-gray-400 mb-2">
                <span>${task.subject}</span>
                <span class="${isOverdue ? "text-red-400" : ""}">
                    <iconify-icon icon="mdi:clock-outline" width="14"></iconify-icon>
                    ${deadlineText}
                </span>
            </div>
            ${task.notes ? `<p class="text-sm mb-3">${task.notes}</p>` : ""}
            <div class="flex justify-end space-x-2">
                <button class="edit-task text-blue-400 hover:text-blue-300 text-sm flex items-center" data-id="${
                  task.id
                }">
                    <iconify-icon icon="mdi:pencil" width="16" class="mr-1"></iconify-icon> Edit
                </button>
                <button class="delete-task text-red-400 hover:text-red-300 text-sm flex items-center" data-id="${
                  task.id
                }">
                    <iconify-icon icon="mdi:trash-can" width="16" class="mr-1"></iconify-icon> Hapus
                </button>
                ${
                  task.status !== "completed"
                    ? `
                <button class="complete-task text-green-400 hover:text-green-300 text-sm flex items-center" data-id="${task.id}">
                    <iconify-icon icon="mdi:check" width="16" class="mr-1"></iconify-icon> Selesai
                </button>
                `
                    : ""
                }
            </div>
        `;

    card.querySelector(".edit-task").addEventListener("click", (e) => {
      e.stopPropagation();
      this.showTaskModal(task.id);
    });

    card.querySelector(".delete-task").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Hapus tugas ini?")) {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.updateSubjectFilter(); // Add this line
        this.renderTasks();
      }
    });

    if (task.status !== "completed") {
      card.querySelector(".complete-task").addEventListener("click", (e) => {
        e.stopPropagation();
        task.status = "completed";
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
      });
    }

    return card;
  }

  setPomodoroMode(mode) {
    this.pomodoroMode = mode;

    if (mode === "short") {
      this.focusTime = 25 * 60;
      this.breakTime = 5 * 60;
      this.shortMode.classList.remove("bg-gray-600");
      this.shortMode.classList.add("bg-gray-700");
      this.longMode.classList.remove("bg-gray-700");
      this.longMode.classList.add("bg-gray-600");
    } else {
      this.focusTime = 50 * 60;
      this.breakTime = 10 * 60;
      this.shortMode.classList.remove("bg-gray-700");
      this.shortMode.classList.add("bg-gray-600");
      this.longMode.classList.remove("bg-gray-600");
      this.longMode.classList.add("bg-gray-700");
    }

    this.resetPomodoro();
  }

  startPomodoro() {
    if (this.pomodoroInterval) {
      clearInterval(this.pomodoroInterval);
    }

    this.isPomodoroRunning = true;
    this.startTimer.disabled = true;
    this.pauseTimer.disabled = false;
    this.startTimer.classList.add("bg-yellow-700");
    this.startTimer.classList.remove("bg-yellow-600");

    if (!this.isPaused) {
      this.playSound("sounds/start.mp3");
      this.currentTime = this.focusTime;
    } else {
      this.isPaused = false;
    }

    if (this.isBreakTime) {
      document.title = "🟢 Break Time | Lock In Mode";
    } else {
      document.title = "🔴 Focus Time | Lock In Mode";
    }

    this.updateTimerDisplay();

    this.pomodoroInterval = setInterval(() => {
      if (this.currentTime <= 0) {
        if (this.isBreakTime) {
          this.isBreakTime = false;
          this.currentTime = this.focusTime;
          this.updateTimerDisplay();
          document.title = "🔴 Focus Time | Lock In Mode";
          this.playSound("sounds/start.mp3");
        } else {
          this.isBreakTime = true;
          this.currentTime = this.breakTime;
          this.updateTimerDisplay();
          document.title = "🟢 Break Time | Lock In Mode";
          this.playSound("sounds/rest.mp3");

          const today = new Date().toISOString().split("T")[0];
          const pomoStats =
            JSON.parse(localStorage.getItem("pomodoroStats")) || {};
          const todayStats = pomoStats[today] || { sessions: 0, focusTime: 0 };

          todayStats.sessions += 1;
          todayStats.focusTime += this.focusTime / 60;

          pomoStats[today] = todayStats;
          localStorage.setItem("pomodoroStats", JSON.stringify(pomoStats));

          this.todaySessions.textContent = todayStats.sessions;
          this.todayFocusTime.textContent = todayStats.focusTime;
        }
      } else {
        this.currentTime--;
        this.updateTimerDisplay();
      }
    }, 1000);
  }

  pausePomodoro() {
    if (this.pomodoroInterval) {
      clearInterval(this.pomodoroInterval);
      this.pomodoroInterval = null;
      this.isPomodoroRunning = false;
      this.isPaused = true;
      this.startTimer.disabled = false;
      this.pauseTimer.disabled = true;
      this.startTimer.classList.remove("bg-yellow-700");
      this.startTimer.classList.add("bg-yellow-600");
      document.title = "⏸️ Paused | Lock In Mode";
    }
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.isBreakTime = false;
    this.isPaused = false;
    this.currentTime = this.focusTime;
    this.updateTimerDisplay();
    document.title = "🔒 Lock In Mode";
  }

  playSound(soundFile) {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.2;
      audio.play().catch((e) => console.error("Gagal memainkan suara:", e));
    } catch (error) {
      console.error("Error dengan audio:", error);
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    this.timerDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (this.isBreakTime) {
      this.timerDisplay.classList.add("text-green-400");
      this.timerDisplay.classList.remove("text-red-400");
    } else {
      this.timerDisplay.classList.add("text-red-400");
      this.timerDisplay.classList.remove("text-green-400");
    }
  }

  saveQuickNote() {
    const today = new Date().toISOString().split("T")[0];
    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    notes[today] = this.quickNote.value;
    localStorage.setItem("notes", JSON.stringify(notes));

    const originalText = this.saveNote.innerHTML;
    this.saveNote.innerHTML =
      '<iconify-icon icon="mdi:check" class="mr-1"></iconify-icon> Tersimpan!';
    this.saveNote.classList.remove("bg-purple-600");
    this.saveNote.classList.add("bg-green-600");

    setTimeout(() => {
      this.saveNote.innerHTML = originalText;
      this.saveNote.classList.add("bg-purple-600");
      this.saveNote.classList.remove("bg-green-600");
    }, 2000);
  }

  updateDateTime() {
    const update = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      this.datetime.textContent = now.toLocaleDateString("id-ID", options);
    };

    update();
    setInterval(update, 1000);
  }

  async loadWeather() {
    try {
      const apiKey = "a086471c8916d2a13aa49033a7568064";
      const lat = -5.41683002;
      const lon = 105.27391088;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.weather || !data.main) {
        throw new Error("Data cuaca tidak valid");
      }

      this.weather.innerHTML = `
                <span>Bandar Lampung: ${
                  data.weather[0].description
                }, ${Math.round(data.main.temp)}°C</span>
                <img src="https://openweathermap.org/img/wn/${
                  data.weather[0].icon
                }.png" alt="Weather icon" class="ml-1 h-6">
            `;
    } catch (error) {
      console.error("Gagal memuat data cuaca:", error);
      this.weather.innerHTML = `<span class="text-gray-400">Gagal memuat data cuaca: ${error.message}</span>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dashboard = new Dashboard();
});
