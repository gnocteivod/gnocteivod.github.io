/**
 * EventHub Auth Helper - auth-helper.js
 * Unified auth for all pages. Load this on every page.
 */

// ── GET / SET USER ─────────────────────────────
function getCurrentUser() {
    var u = localStorage.getItem('currentUser') || localStorage.getItem('userLogin');
    if (!u || u === 'null') return null;
    try { return JSON.parse(u); } catch(e) { return null; }
}

function setCurrentUser(user) {
    var s = JSON.stringify(user);
    localStorage.setItem('currentUser', s);
    localStorage.setItem('userLogin', s); // keep both keys in sync
    localStorage.setItem('isLoggedIn', 'true');
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('isLoggedIn');
}

// ── AUTH UI ────────────────────────────────────
function updateHeaderAuth(opts) {
    var user = getCurrentUser();
    var guestNav = document.getElementById('guest-nav');
    var userNav  = document.getElementById('user-nav');
    if (!guestNav || !userNav) return;

    if (user) {
        guestNav.classList.add('hidden');
        userNav.classList.remove('hidden');
        var i1 = document.getElementById('header-avatar-initial');
        var i2 = document.getElementById('header-username');
        var i3 = document.getElementById('menu-name');
        var i4 = document.getElementById('menu-email');
        var i5 = document.getElementById('menu-balance');
        var initial = (user.name || 'U')[0].toUpperCase();
        if (i1) i1.textContent = initial;
        if (i2) i2.textContent = user.name || 'User';
        if (i3) i3.textContent = user.name || 'Người dùng';
        if (i4) i4.textContent = user.email || '';
        var bal = parseInt(localStorage.getItem('userBalance') || '0');
        if (i5) i5.textContent = bal.toLocaleString('vi-VN') + 'đ';
    } else {
        guestNav.classList.remove('hidden');
        userNav.classList.add('hidden');
        if (opts && opts.requireAuth) {
            var page = window.location.pathname.split('/').pop() + window.location.search;
            window.location.href = 'auth.html?mode=login&redirect=' + encodeURIComponent(page);
        }
    }
}

function handleLogout() {
    // Try Firebase signOut if loaded
    if (window.firebase && window.firebase.auth) {
        try { window.firebase.auth().signOut().catch(function(){}); } catch(e){}
    }
    clearCurrentUser();
    window.location.href = 'index.html';
}

function toggleHeaderMenu() {
    var menu = document.getElementById('header-user-menu');
    if (menu) menu.classList.toggle('hidden');
}

// ── THEME ──────────────────────────────────────
function toggleTheme() {
    var html = document.documentElement;
    var icon = document.getElementById('theme-icon');
    html.classList.toggle('dark');
    var isDark = html.classList.contains('dark');
    if (icon) icon.className = isDark
        ? 'fa-solid fa-sun text-yellow-300 text-sm'
        : 'fa-solid fa-moon text-gray-500 text-sm';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

(function applyTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.addEventListener('DOMContentLoaded', function() {
            var icon = document.getElementById('theme-icon');
            if (icon) icon.className = 'fa-solid fa-sun text-yellow-300 text-sm';
        });
    }
})();

// ── ORDERS HELPERS ─────────────────────────────
function saveOrder(order) {
    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    if (!order.id) order.id = 'EH' + Date.now().toString().slice(-6);
    if (!order.date) order.date = new Date().toLocaleString('vi-VN');
    orders.unshift(order);
    localStorage.setItem('my_orders', JSON.stringify(orders.slice(0, 200)));
}

function getOrders() {
    return JSON.parse(localStorage.getItem('my_orders') || '[]');
}

// ── CLOSE MENU ON OUTSIDE CLICK ───────────────
document.addEventListener('click', function(e) {
    var menu = document.getElementById('header-user-menu');
    var nav  = document.getElementById('user-nav');
    if (menu && nav && !nav.contains(e.target)) menu.classList.add('hidden');
});

// ── AUTO INIT HEADER ──────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderAuth();
});

// ── EXPOSE GLOBALS ────────────────────────────
window.getCurrentUser   = getCurrentUser;
window.setCurrentUser   = setCurrentUser;
window.clearCurrentUser = clearCurrentUser;
window.updateHeaderAuth = updateHeaderAuth;
window.handleLogout     = handleLogout;
window.toggleHeaderMenu = toggleHeaderMenu;
window.toggleTheme      = toggleTheme;
window.saveOrder        = saveOrder;
window.getOrders        = getOrders;
