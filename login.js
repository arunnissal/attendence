const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const adminCreds = { username: "admin", password: "admin123" };
  const studentCreds = { username: "student", password: "student123" };

  if (
    (role === "admin" && username === adminCreds.username && password === adminCreds.password) ||
    (role === "student" && username === studentCreds.username && password === studentCreds.password)
  ) {
    localStorage.setItem("userRole", role);
    window.location.href = role === "admin" ? "admin.html" : "student.html";
  } else {
    errorMsg.textContent = "Invalid credentials.";
  }
});