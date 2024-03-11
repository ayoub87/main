const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  downloadBtn = document.querySelector(".download"),
  inputLanguage = document.querySelector("#language"),
  clearBtn = document.querySelector(".clear");

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;

function populateLanguages() {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerHTML = lang.name;
    inputLanguage.appendChild(option);
  });
}

populateLanguages();

async function ensureDirectoryExists(directory) {
  try {
    const response = await fetch(directory, { method: "HEAD" });
    if (!response.ok) {
      await fetch(directory, { method: "MKCOL" });
    }
  } catch (error) {
    console.error("Failed to ensure directory exists:", error);
  }
}

async function fetchAndDisplayTextFiles() {
  const directory = 'download/text to speech -youbie-/'; // Directory path
  try {
    await ensureDirectoryExists('download');
    await ensureDirectoryExists(directory);
    const response = await fetch(directory);
    if (!response.ok) {
      throw new Error('Failed to fetch directory listing');
    }
    const files = await response.json();
    const fileListElement = document.querySelector('.file-list');
    fileListElement.innerHTML = ''; // Clear previous list
    
    files.forEach(file => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = file.name;
      link.href = '#';
      link.addEventListener('click', async () => {
        const fileResponse = await fetch(directory + file.name);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch file ${file.name}`);
        }
        const text = await fileResponse.text();
        displayTextContent(text);
      });
      listItem.appendChild(link);
      fileListElement.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
}

function displayTextContent(text) {
  const contentElement = document.querySelector('.text-content');
  contentElement.textContent = text;
}

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}

function download() {
  const text = result.innerText;
  const filename = "speech.txt";

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

downloadBtn.addEventListener("click", download);

clearBtn.addEventListener("click", () => {
  result.innerHTML = "";
  downloadBtn.disabled = true;
});

fetchAndDisplayTextFiles();
