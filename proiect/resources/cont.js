const usernameRegex = /^[a-zA-Z]{5}[0-9]{3}$/;

function checkSession() {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('create-account-section').classList.add('hidden');
        document.getElementById('logout-section').classList.remove('hidden');
        document.getElementById('user-name-display').textContent = session.username;
        startSessionTimeout();
    } else {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('create-account-section').classList.add('hidden');
        document.getElementById('logout-section').classList.add('hidden');
    }
}

function createAccount() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value.trim();

    if (!usernameRegex.test(username)) {
        alert('Username-ul trebuie să fie format din 5 litere și 3 cifre!');
        return;
    }

    if (password.length < 6) {
        alert('Parola trebuie să aibă cel puțin 6 caractere!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Acest username este deja folosit!');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Contul a fost creat cu succes!');
    showLogin();
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const account = users.find(user => user.username === username && user.password === password);

    if (account) {
        localStorage.setItem('session', JSON.stringify({ username }));
        checkSession();
    } else {
        alert('Username sau parolă incorecte!');
    }
}
function logout() {
    localStorage.removeItem('session');
    checkSession();
}

function navigateToPage(page) {
    window.location.href = page;
}

function showCreateAccount() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('create-account-section').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('create-account-section').classList.add('hidden');
}

function startSessionTimeout() {
    setTimeout(() => {
        alert('Ai fost delogat din cauza inactivității!');
        logout();
    }, 30 * 60 * 1000); 
}

function addEnterKeyListener() {
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');

    [loginUsername, loginPassword].forEach(input => {
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                login(); 
            }
        });
    });
}
window.onload = function() {
    checkSession();

    addEnterKeyListener();
};
