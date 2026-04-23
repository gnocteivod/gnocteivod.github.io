/**
 * EventHub Auth Helper
 * Unified auth check for all pages - supports both Firebase and localStorage
 */

// Get current user from either Firebase auth state or localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function isLoggedIn() {
    return !!getCurrentUser();
}

// Update header auth UI on any page
function updateHeaderAuth(options = {}) {
    const user = getCurrentUser();
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    if (!guestNav || !userNav) return;

    if (user) {
        guestNav.classList.add('hidden');
        userNav.classList.remove('hidden');
        const i1 = document.getElementById('header-avatar-initial');
        const i2 = document.getElementById('header-username');
        const i3 = document.getElementById('menu-name');
        const i4 = document.getElementById('menu-email');
        const i5 = document.getElementById('menu-balance');
        const initial = (user.name || 'U')[0].toUpperCase();
        if (i1) i1.textContent = initial;
        if (i2) i2.textContent = user.name || 'User';
        if (i3) i3.textContent = user.name || 'Người dùng';
        if (i4) i4.textContent = user.email || '';
        const balance = parseInt(localStorage.getItem('userBalance') || '0');
        if (i5) i5.textContent = balance.toLocaleString('vi-VN') + 'đ';
    } else {
        guestNav.classList.remove('hidden');
        userNav.classList.add('hidden');
        if (options.requireAuth) {
            window.location.href = 'auth.html?mode=login&redirect=' + encodeURIComponent(window.location.pathname.split('/').pop() + window.location.search);
        }
    }
}

function handleLogout() {
    // Try Firebase signOut if available
    try {
        const { getAuth, signOut } = window._firebaseAuth || {};
        if (getAuth && signOut) signOut(getAuth()).catch(() => {});
    } catch(e) {}
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function toggleHeaderMenu() {
    const menu = document.getElementById('header-user-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Save order to localStorage
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    orders.unshift({ ...order, id: order.id || 'EH' + Date.now().toString().slice(-6), date: new Date().toLocaleString('vi-VN') });
    localStorage.setItem('my_orders', JSON.stringify(orders));
}

// Get all orders
function getOrders() {
    return JSON.parse(localStorage.getItem('my_orders') || '[]');
}

window.getCurrentUser = getCurrentUser;
window.isLoggedIn = isLoggedIn;
window.updateHeaderAuth = updateHeaderAuth;
window.handleLogout = handleLogout;
window.toggleHeaderMenu = toggleHeaderMenu;
window.saveOrder = saveOrder;
window.getOrders = getOrders;

// Auto-close header menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('header-user-menu');
    const nav = document.getElementById('user-nav');
    if (menu && nav && !nav.contains(e.target)) menu.classList.add('hidden');
});

// Dark mode helper
window.toggleTheme = function() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    if (icon) icon.className = isDark ? 'fa-solid fa-sun text-yellow-300 text-sm' : 'fa-solid fa-moon text-gray-500 text-sm';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

(function applyTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.addEventListener('DOMContentLoaded', () => {
            const icon = document.getElementById('theme-icon');
            if (icon) icon.className = 'fa-solid fa-sun text-yellow-300 text-sm';
        });
    }
})();
