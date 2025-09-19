// youtubeToText.js

const youtubeInput = document.getElementById("youtubeInput");
const youtubeConvertBtn = document.getElementById("youtubeConvertBtn");

youtubeConvertBtn.addEventListener("click", () => {
  const youtubeLink = youtubeInput.value;
  if (youtubeLink) {
    alert(`Converting YouTube video: ${youtubeLink} (This feature is not yet implemented.)`);
    // Here you would integrate with a backend service to convert YouTube video to text
    // For now, it's just an alert.
  } else {
    alert("Please enter a YouTube video link.");
  }
});


