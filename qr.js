function logout() {
    localStorage.removeItem("userRole");
    window.location.href = 'login.html';
  }
  
  const logList = document.getElementById("log");
  
  function markAttendance(qrText) {
    const time = new Date().toLocaleString();
    const logEntry = { id: qrText, time };
  
    const logs = JSON.parse(localStorage.getItem("attendance")) || [];
    logs.unshift(logEntry);
    localStorage.setItem("attendance", JSON.stringify(logs));
  
    displayLog(logEntry);
  }
  
  function displayLog(entry) {
    const li = document.createElement("li");
    li.textContent = `ID: ${entry.id} — Marked at ${entry.time}`;
    logList.prepend(li);
  }
  
  const html5QrCode = new Html5Qrcode("reader");
  
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      markAttendance(decodedText);
      html5QrCode.stop();
      setTimeout(() => {
        html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          markAttendance
        );
      }, 2000);
    },
    (errorMessage) => {}
  );