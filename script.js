/* filepath: /c:/Users/sjcma/OneDrive/Desktop/personal info.html.miss joyce/script.js */
function togglePlaylist() {
    const panel = document.querySelector('.playlist-panel');
    const button = document.querySelector('.toggle-button');
    panel.classList.toggle('collapsed');
    button.style.display = panel.classList.contains('collapsed') ? 'block' : 'none';
  }
  
  function changeVideo(source, element) {
    const video = document.getElementById('bgVideo');
    video.src = source;
    video.load();
  
    // Update active state
    document.querySelectorAll('.video-item').forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  
  // Global variable to store the base64 data URL of the uploaded image
  let profileImageDataUrl = "";
  
  function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.getElementById("profilePreview");
        preview.src = e.target.result;
        preview.style.display = "block";
        // Store the base64 data URL for use in the PDF
        profileImageDataUrl = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }
  
  function printInfo() {
    const fullName = document.getElementById("fullName").value;
    const age = parseInt(document.getElementById("age").value);
    const hobbiesInput = document.getElementById("hobbies").value;
    const favoriteNumber = parseInt(document.getElementById("favoriteNumber").value);
    const goal = document.getElementById("goal").value;
  
    if (!fullName || !age || !hobbiesInput || !favoriteNumber || !goal) {
      alert("Please fill in all fields");
      return;
    }
  
    const hobbies = hobbiesInput
      .split(",")
      .map(hobby => hobby.trim())
      .filter(hobby => hobby !== "");
  
    const squareFavoriteNumber = num => num * num;
    const ageGroup = age < 18 ? "Minor" : "Adult";
  
    // Check if a profile picture was chosen (using the preview's src)
    const profilePicSrc = document.getElementById("profilePreview").src;
    const profileImageHTML = profilePicSrc
      ? `<img src="${profilePicSrc}" alt="Profile Picture" style="max-width:150px; border-radius:50%; display:block; margin: 10px auto;" />`
      : "";
  
    let output = `
      ${profileImageHTML}
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Age:</strong> ${age} (${ageGroup})</p>
      <p><strong>Hobbies:</strong></p>
      <ul>
          ${hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
      </ul>
      <p><strong>Favorite Number:</strong> ${favoriteNumber}</p>
      <p><strong>Squared Favorite Number:</strong> ${squareFavoriteNumber(favoriteNumber)}</p>
      <p><strong>Goal:</strong> ${goal}</p>
    `;
  
    document.getElementById("output").innerHTML = output;
  }
  
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
  
    let y = 10;
    pdf.setFontSize(12);
  
    // If a profile picture was uploaded, add it to the PDF
    if (profileImageDataUrl) {
      pdf.addImage(profileImageDataUrl, 'JPEG', 10, y, 40, 40);
      y += 50;
    }
  
    const outputElement = document.getElementById("output");
    const text = outputElement.innerText;
    const lines = pdf.splitTextToSize(text, 180);
    pdf.text(lines, 10, y);
  
    pdf.save("profile.pdf");
  }
  
  // Ensure the video plays when the website is open
  document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    if (video.paused) {
      video.play().catch(error => console.error("Error playing video:", error));
    }
  });