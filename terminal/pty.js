const { Terminal } = require("@xterm/xterm");
const { ipcRenderer } = require("electron");

let terminals = {};
let activeId = null;

const tabsDiv = document.getElementById("tabs");
const container = document.getElementById("terminal-container");

function createTab(id) {
  const tab = document.createElement("div");
  tab.className = "tab";
  tab.innerText = id;

  const close = document.createElement("span");
  close.innerText = " ×";
  close.className = "close";

  close.onclick = (e) => {
    e.stopPropagation();
    delete terminals[id];
    tab.remove();
    document.getElementById(id)?.remove();
  };

  tab.onclick = () => switchTab(id);

  tab.appendChild(close);
  tabsDiv.appendChild(tab);
}

function switchTab(id) {
  activeId = id;

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  [...tabsDiv.children].find(t => t.innerText.includes(id))?.classList.add("active");

  Object.keys(terminals).forEach(tid => {
    document.getElementById(tid).style.display = tid === id ? "block" : "none";
  });
}

function createTerminal(id) {
  const div = document.createElement("div");
  div.id = id;
  div.style.height = "100%";
  container.appendChild(div);

  const term = new Terminal({
    cursorBlink: true,
    theme: {
      background: "#000000",
      foreground: "#00FF00"
    }
  });

  term.open(div);

  term.onData(data => {
    ipcRenderer.send("terminal-input", { id, data });
  });

  ipcRenderer.on("terminal-output", (event, msg) => {
    if (msg.id === id) term.write(msg.data);
  });

  terminals[id] = term;

  createTab(id);
  switchTab(id);
}

// default
createTerminal("tab1");

// CMD + T → new tab
document.addEventListener("keydown", (e) => {
  if (e.metaKey && e.key === "t") {
    const id = "tab" + Date.now();
    ipcRenderer.send("new-terminal", id);
    createTerminal(id);
  }
});
