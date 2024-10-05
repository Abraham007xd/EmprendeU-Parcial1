const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "" || password === "") {
    alert("Por favor, llene todos los campos.");
    return;
  }

  fetch('https://api.jsonbin.io/v3/b/67007417e41b4d34e43d1b42')
    .then(response => response.json())
    .then(data => {
      const userFound = data.roles.find(role => 
        role.users.find(user => user.name === username && user.password === password)
      );

      if (userFound) {
        localStorage.setItem('user', JSON.stringify({username, role: userFound.role}));
        window.location.href = userFound.role === "Admin" ? 'admin.html' : 'usuario.html';
      } else {
        alert("Nombre o contraseña incorrectos.");
      }
    })
    .catch(err => console.error('Error al obtener el JSON:', err));
});

