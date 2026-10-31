const messagesElement = document.querySelector("#messages");
const chatForm = document.querySelector("#chatForm");
const messageInput = document.querySelector("#messageInput");
const sendLabel = document.querySelector("#sendLabel");
const clearButton = document.querySelector("#clearButton");
const newSessionButton = document.querySelector("#newSessionButton");
const temperatureInput = document.querySelector("#temperatureInput");
const temperatureValue = document.querySelector("#temperatureValue");
const focusButton = document.querySelector("#focusButton");
const themeButton = document.querySelector("#themeButton");
const workspaceName = document.querySelector("#workspaceName");

const sidebar = document.querySelector("#sidebar");
const mobileMenuButton = document.querySelector("#mobileMenuButton");
const mobileOverlay = document.querySelector("#mobileOverlay");
const sidebarClose = document.querySelector("#sidebarClose");

let loading = false;

function createMessage({ role, text, time = "now" }) {
  const article = document.createElement("article");

  article.className = `message ${
    role === "user" ? "user-message" : "ai-message"
  }`;

  const label = role === "user" ? "You" : "Auralyn";
  const mark = role === "user" ? "◉" : "✦";

  article.innerHTML = `
    <div class="message-mark">${mark}</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(time)}</span>
      </div>

      <div class="message-text">${escapeHtml(text)}</div>

      ${
        role === "assistant"
          ? `
            <div class="message-actions">
              <button class="message-action copy-message">Copy</button>
              <button class="message-action">Regenerate</button>
            </div>
          `
          : ""
      }
    </div>
  `;

  const copyButton = article.querySelector(".copy-message");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1200);
    });
  }

  messagesElement.appendChild(article);
  article.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function createThinkingMessage() {
  const article = document.createElement("article");

  article.className = "message ai-message";
  article.id = "thinkingMessage";

  article.innerHTML = `
    <div class="message-mark">✦</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>Auralyn</strong>
        <span>processing</span>
      </div>

      <div class="thinking">
        <i></i>
        <i></i>
        <i></i>
        <em>Auralyn is thinking...</em>
      </div>
    </div>
  `;

  messagesElement.appendChild(article);
  article.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function removeThinkingMessage() {
  document.querySelector("#thinkingMessage")?.remove();
}

function setLoading(value) {
  loading = value;
  sendLabel.textContent = value ? "Thinking" : "Transmit";
  messageInput.disabled = value;
}

async function sendMessage(event) {
  event?.preventDefault();

  const message = messageInput.value.trim();

  if (!message || loading) {
    return;
  }

  const temperature = Number(temperatureInput.value);

  createMessage({
    role: "user",
    text: message,
  });

  messageInput.value = "";
  createThinkingMessage();
  setLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        temperature,
      }),
    });

    const data = await response.json();

    removeThinkingMessage();

    if (!response.ok) {
      throw new Error(data.error || "Auralyn request failed.");
    }

    createMessage({
      role: "assistant",
      text: data.text,
    });
  } catch (error) {
    removeThinkingMessage();

    createMessage({
      role: "assistant",
      text:
        error instanceof Error
          ? error.message
          : "Auralyn encountered an unknown error.",
      time: "error",
    });
  } finally {
    setLoading(false);
  }
}

function clearMessages() {
  messagesElement.innerHTML = "";

  createMessage({
    role: "assistant",
    text:
      "Welcome to Auralyn. Your intelligence workspace is online. What are we building today?",
    time: "ready",
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

chatForm.addEventListener("submit", sendMessage);
clearButton.addEventListener("click", clearMessages);
newSessionButton.addEventListener("click", clearMessages);

temperatureInput.addEventListener("input", () => {
  temperatureValue.textContent = Number(temperatureInput.value).toFixed(1);
});

focusButton.addEventListener("click", () => {
  messageInput.focus();
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("soft-mode");
});

document.querySelectorAll(".quick-prompt").forEach((button) => {
  button.addEventListener("click", () => {
    messageInput.value = button.textContent
      .replace("✧", "")
      .trim();

    messageInput.focus();
  });
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");
    workspaceName.textContent = button.dataset.workspace;
    closeSidebar();
  });
});

function openSidebar() {
  sidebar.classList.add("sidebar-visible");
  mobileOverlay.classList.add("visible");
}

function closeSidebar() {
  sidebar.classList.remove("sidebar-visible");
  mobileOverlay.classList.remove("visible");
}

mobileMenuButton.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
mobileOverlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    messageInput.focus();
  }

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key === "Enter"
  ) {
    event.preventDefault();
    sendMessage();
  }

  if (event.key === "Escape") {
    closeSidebar();
  }
});
