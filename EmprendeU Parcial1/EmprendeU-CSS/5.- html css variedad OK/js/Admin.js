window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.role !== 'Admin') {
      alert('Acceso denegado');
      window.location.href = 'login.html';
    } else {
      document.getElementById('userDisplay').innerText = `Bienvenido, ${user.username}`;
      loadAdminData();
    }
  };
  
  const loadAdminData = () => {
    fetch('https://api.jsonbin.io/v3/b/67007417e41b4d34e43d1b42')
      .then(response => response.json())
      .then(data => {
        const adminData = data.roles.find(role => role.role === 'Admin').users;
        const tableBody = document.querySelector('#adminTable tbody');
        
        adminData.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${user.name}</td><td>${user.password}</td><td>Admin</td>`;
          tableBody.appendChild(row);
        });
      })
      .catch(err => console.error('Error al cargar los datos:', err));
  };