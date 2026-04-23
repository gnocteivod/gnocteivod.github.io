/**
 * EventHub Dashboard - dashboard.js
 * Viết lại hoàn toàn: KHÔNG dùng ES module, tất cả hàm đều global
 */

// ═══════════════════════════════════════════════
// 1. BIẾN TOÀN CỤC
// ═══════════════════════════════════════════════
var currentBalance = 0;
var selectedMethod = '';
var dropdownMenu = null;

// ═══════════════════════════════════════════════
// 2. LẤY USER & AUTH
// ═══════════════════════════════════════════════
function getUser() {
    return JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('userLogin') || 'null');
}

function getBalance() {
    return parseInt(localStorage.getItem('userBalance') || '0');
}

function saveBalance(val) {
    localStorage.setItem('userBalance', String(val));
    currentBalance = val;
}

// ═══════════════════════════════════════════════
// 3. KHỞI TẠO TRANG
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    var user = getUser();
    if (!user) {
        window.location.href = 'auth.html?mode=login&redirect=dashboard.html';
        return;
    }

    dropdownMenu = document.getElementById('dropdown-menu');
    currentBalance = getBalance();

    // Tên chào mừng
    var wn = document.getElementById('user-welcome-name');
    if (wn) wn.textContent = (user.name || 'Bạn') + ' ✨';

    // Ngày tháng thực
    var dateEl = document.getElementById('real-time-date');
    if (dateEl) {
        var now = new Date();
        dateEl.textContent = now.getDate() + ' Tháng ' + (now.getMonth()+1) + ', ' + now.getFullYear();
    }

    // Địa điểm
    var locEl = document.getElementById('user-location');
    if (locEl) locEl.textContent = user.address || 'Việt Nam';

    // Auth zone top-right
    renderAuthZone(user);

    // Số dư
    updateBalanceDisplay();

    // Profile inputs
    loadProfileInputs(user);

    // Render vé
    renderMyTickets();
    renderRefundTickets();

    // Close dropdown khi click ngoài
    document.addEventListener('click', function(e) {
        if (dropdownMenu && !dropdownMenu.contains(e.target)) {
            var avatarBtn = document.getElementById('avatar-btn');
            if (!avatarBtn || !avatarBtn.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        }
    });
});

function renderAuthZone(user) {
    var authZone = document.getElementById('auth-zone');
    if (!authZone) return;
    var avatar = user.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(user.name || 'user');
    authZone.innerHTML =
        '<div id="avatar-btn" class="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-1 pr-4 rounded-full border border-pink-100 shadow-sm cursor-pointer select-none" onclick="toggleDropdown()">' +
            '<img src="' + avatar + '" class="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover" onerror="this.src=\'https://api.dicebear.com/7.x/adventurer/svg?seed=user\'">' +
            '<div class="flex flex-col">' +
                '<span class="text-[10px] text-gray-400 leading-none uppercase">Thành viên</span>' +
                '<span class="text-xs text-pink-600 truncate max-w-[100px] font-bold">' + (user.name || 'User') + '</span>' +
            '</div>' +
            '<button onclick="event.stopPropagation();doLogout();" class="ml-2 text-gray-400 hover:text-red-500 transition text-sm"><i class="fa-solid fa-right-from-bracket"></i></button>' +
        '</div>';
}

function toggleDropdown() {
    if (dropdownMenu) dropdownMenu.classList.toggle('active');
}

function doLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userLogin');
    window.location.href = 'index.html';
}
window.logout = doLogout;
window.handleLogout = doLogout;

// ═══════════════════════════════════════════════
// 4. ĐIỀU HƯỚNG TRANG (SIDEBAR)
// ═══════════════════════════════════════════════
function showPage(pageId, el) {
    // Ẩn tất cả
    var pages = document.querySelectorAll('.page-content');
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');

    // Hiện trang được chọn
    var target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    // Update sidebar active
    var navItems = document.querySelectorAll('.nav-item');
    for (var j = 0; j < navItems.length; j++) navItems[j].classList.remove('active');
    if (el) el.classList.add('active');

    // Close dropdown
    if (dropdownMenu) dropdownMenu.classList.remove('active');

    // Side effects
    if (pageId === 'profile') loadProfileInputs(getUser());
    if (pageId === 'tickets') renderMyTickets();
    if (pageId === 'refund-page') renderRefundTickets();
    if (pageId === 'wallet') updateWalletDisplay();
}
window.showPage = showPage;

// ═══════════════════════════════════════════════
// 5. MODAL OPEN/CLOSE
// ═══════════════════════════════════════════════
function openModal(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('active');
    // Nếu mở modal vé → update dữ liệu
    if (id === 'modal-ticket-detail') populateTicketModal();
    // Nếu mở lịch sử → render lịch sử
    if (id === 'modal-history') renderHistory();
}

function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('active');
}
window.openModal = openModal;
window.closeModal = closeModal;

// ═══════════════════════════════════════════════
// 6. SỐ DƯ VÍ
// ═══════════════════════════════════════════════
function updateBalanceDisplay() {
    var bal = currentBalance;
    var fmt = bal.toLocaleString('vi-VN');
    var el1 = document.getElementById('balance-dashboard');
    var el2 = document.getElementById('balance-wallet');
    if (el1) el1.innerHTML = fmt + ' <span class="text-sm">VND</span>';
    if (el2) el2.textContent = fmt + 'đ';
}

function updateWalletDisplay() {
    currentBalance = getBalance();
    updateBalanceDisplay();
}

function animateBalance(from, to) {
    var el = document.getElementById('balance-dashboard');
    var el2 = document.getElementById('balance-wallet');
    var start = null;
    var dur = 800;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var cur = Math.floor(from + (to - from) * p);
        var fmt = cur.toLocaleString('vi-VN');
        if (el) el.innerHTML = fmt + ' <span class="text-sm">VND</span>';
        if (el2) el2.textContent = fmt + 'đ';
        if (p < 1) requestAnimationFrame(step);
        else { currentBalance = to; saveBalance(to); }
    }
    requestAnimationFrame(step);
}

// ═══════════════════════════════════════════════
// 7. NẠP TIỀN
// ═══════════════════════════════════════════════
function setAmount(val) {
    var inp = document.getElementById('nap-tien-input');
    if (inp) {
        inp.value = val;
        // Format hiển thị
        inp.dispatchEvent(new Event('input'));
    }
}
window.setAmount = setAmount;

function selectMethod(method) {
    selectedMethod = method;
    var btns = document.querySelectorAll('.payment-method');
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('border-pink-500', 'bg-pink-50', 'border-blue-500', 'bg-blue-50', 'border-green-500', 'bg-green-50');
    }
    var active = document.getElementById('method-' + method);
    if (!active) return;
    if (method === 'momo') { active.classList.add('border-pink-500', 'bg-pink-50'); }
    else if (method === 'bank') { active.classList.add('border-blue-500', 'bg-blue-50'); }
    else { active.classList.add('border-green-500', 'bg-green-50'); }
}
window.selectMethod = selectMethod;

function processPayment() {
    var amountRaw = document.getElementById('nap-tien-input');
    if (!amountRaw) return;
    var amount = parseInt(amountRaw.value);
    if (!amount || amount < 10000) { alert('Vui lòng nạp tối thiểu 10.000đ!'); return; }
    if (!selectedMethod) { alert('Vui lòng chọn phương thức thanh toán!'); return; }

    // Hiện step 2
    var s1 = document.getElementById('nap-tien-step-1');
    var s2 = document.getElementById('nap-tien-step-2');
    if (s1) s1.classList.add('hidden');
    if (s2) s2.classList.remove('hidden');

    // Hiện số tiền
    var dispAmt = document.getElementById('display-amount');
    if (dispAmt) dispAmt.textContent = amount.toLocaleString('vi-VN') + 'đ';

    // Hiện instruction
    var instr = document.getElementById('payment-instruction');
    var status = document.getElementById('payment-status');

    // Tạo QR
    var qrImg = document.getElementById('qr-image');
    if (qrImg) {
        if (selectedMethod === 'bank') {
            var content = encodeURIComponent('EVENTHUB NAP ' + amount);
            qrImg.src = 'https://img.vietqr.io/image/MB-0342856791-compact2.jpg?amount=' + amount + '&addInfo=' + content + '&accountName=NGUYEN%20DIEU%20THAO';
            if (instr) instr.textContent = 'Quét mã QR để nạp tiền qua MB Bank';
        } else if (selectedMethod === 'momo') {
            qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=2|99|0342856791|NGUYEN+DIEU+THAO|0|0|0|Nap+tien+EventHub+' + amount + '|transfer_myqr&color=A50064&bgcolor=ffffff';
            if (instr) instr.textContent = 'Quét mã QR để nạp tiền qua MoMo';
        } else {
            qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ZALOPAY_EVENTHUB_' + amount;
            if (instr) instr.textContent = 'Quét mã QR để nạp tiền qua ZaloPay';
        }
    }

    if (status) status.innerHTML = '<span class="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-[10px] font-black uppercase animate-pulse">Đang chờ thanh toán...</span>';
}
window.processPayment = processPayment;

function simulateSuccess(e) {
    var btn = e ? e.currentTarget || e.target : null;
    var amountRaw = document.getElementById('nap-tien-input');
    var amount = amountRaw ? parseInt(amountRaw.value) : 0;
    if (!amount) return;

    if (btn) { btn.textContent = '⏳ Đang xác thực...'; btn.disabled = true; }

    setTimeout(function() {
        var from = currentBalance;
        var to = from + amount;
        animateBalance(from, to);

        // Thêm lịch sử
        addToHistory(amount, selectedMethod === 'bank' ? 'MB Bank QR' : selectedMethod === 'momo' ? 'MoMo' : 'ZaloPay');

        // Lưu log admin
        saveDepositLog(amount, selectedMethod);

        // Đóng modal & reset
        closeModal('modal-nap-tien');
        backToStep1();
        if (btn) { btn.textContent = 'Xác nhận đã chuyển'; btn.disabled = false; }

        alert('✅ Nạp ' + amount.toLocaleString('vi-VN') + 'đ thành công!');
    }, 1200);
}
window.simulateSuccess = simulateSuccess;

function backToStep1() {
    var s1 = document.getElementById('nap-tien-step-1');
    var s2 = document.getElementById('nap-tien-step-2');
    if (s1) s1.classList.remove('hidden');
    if (s2) s2.classList.add('hidden');
    selectedMethod = '';
    var btns = document.querySelectorAll('.payment-method');
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('border-pink-500', 'bg-pink-50', 'border-blue-500', 'bg-blue-50', 'border-green-500', 'bg-green-50');
    }
}
window.backToStep1 = backToStep1;

// ═══════════════════════════════════════════════
// 8. LỊCH SỬ GIAO DỊCH
// ═══════════════════════════════════════════════
function addToHistory(amount, method) {
    var history = JSON.parse(localStorage.getItem('deposit_history') || '[]');
    var now = new Date();
    history.unshift({
        id: 'GD' + Date.now().toString().slice(-6),
        amount: amount,
        method: method || 'Hệ thống',
        date: now.toLocaleString('vi-VN'),
        type: 'deposit'
    });
    localStorage.setItem('deposit_history', JSON.stringify(history.slice(0, 50)));
}

function renderHistory() {
    var container = document.querySelector('#modal-history .space-y-4');
    if (!container) return;
    var history = JSON.parse(localStorage.getItem('deposit_history') || '[]');

    if (!history.length) {
        container.innerHTML = '<div class="text-center py-8 text-gray-400"><i class="fa-solid fa-clock text-3xl mb-3 opacity-30"></i><p class="font-bold text-sm">Chưa có giao dịch nào</p></div>';
        return;
    }

    container.innerHTML = history.map(function(h) {
        return '<div class="flex justify-between items-center p-5 bg-green-50 rounded-[2rem] border border-green-100 shadow-sm">' +
            '<div>' +
                '<p class="font-black text-sm">Nạp tiền qua ' + (h.method || 'Hệ thống') + '</p>' +
                '<p class="text-[10px] font-bold text-gray-400">' + h.date + '</p>' +
            '</div>' +
            '<div class="flex items-center gap-3">' +
                '<p class="text-green-500 font-black">+' + (h.amount || 0).toLocaleString('vi-VN') + 'đ</p>' +
                '<button onclick="printInvoice(\'Nạp tiền\', \'' + (h.amount || 0).toLocaleString('vi-VN') + '\')" class="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-pink-500 hover:text-white transition">' +
                    '<i class="fa-solid fa-print text-xs"></i>' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

function saveDepositLog(amount, method) {
    var logs = JSON.parse(localStorage.getItem('admin_deposit_logs') || '[]');
    var user = getUser();
    logs.push({ id: 'GD' + Date.now().toString().slice(-6), user: user ? user.name : 'Khách', amount: amount, method: method, time: new Date().toLocaleString('vi-VN'), status: 'completed' });
    localStorage.setItem('admin_deposit_logs', JSON.stringify(logs));
}

function printInvoice(type, amount) {
    var user = getUser();
    var w = window.open('', '_blank', 'width=500,height=400');
    if (!w) { alert('Vui lòng cho phép popup để in hoá đơn!'); return; }
    w.document.write('<html><head><title>Hoá đơn EventHub</title><style>body{font-family:Arial,sans-serif;padding:30px;color:#333}.logo{color:#F33B26;font-size:24px;font-weight:900;margin-bottom:4px}.hr{border:1px dashed #ccc;margin:16px 0}.row{display:flex;justify-content:space-between;margin:8px 0;font-size:14px}.total{font-size:18px;font-weight:900;color:#F33B26}</style></head><body>');
    w.document.write('<div class="logo">EventHub</div><p style="font-size:12px;color:#888">Hoá đơn điện tử</p>');
    w.document.write('<div class="hr"></div>');
    w.document.write('<div class="row"><span>Loại GD:</span><span>' + type + '</span></div>');
    w.document.write('<div class="row"><span>Khách hàng:</span><span>' + (user ? user.name : 'N/A') + '</span></div>');
    w.document.write('<div class="row"><span>Thời gian:</span><span>' + new Date().toLocaleString('vi-VN') + '</span></div>');
    w.document.write('<div class="hr"></div>');
    w.document.write('<div class="row total"><span>Số tiền:</span><span>' + amount + 'đ</span></div>');
    w.document.write('<div class="hr"></div><p style="font-size:11px;color:#888;text-align:center">Cảm ơn bạn đã sử dụng EventHub!</p>');
    w.document.write('</body></html>');
    w.document.close();
    w.print();
}
window.printInvoice = printInvoice;

// ═══════════════════════════════════════════════
// 9. VÉ CỦA TÔI
// ═══════════════════════════════════════════════
var myTicket = {
    eventName: 'GAI HOME CONCERT 2026',
    seat: 'VIP A12',
    time: '20:00 - 18/04/2026',
    price: '1.500.000đ',
    location: 'Sân vận động Quốc gia Mỹ Đình',
    orderId: '#EHB-' + Math.floor(10000 + Math.random() * 90000),
    ownerName: ''
};

function renderMyTickets() {
    var container = document.getElementById('my-tickets-container');
    if (!container) return;

    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');

    if (!orders.length) {
        container.innerHTML =
            '<div class="text-center py-16 text-gray-400">' +
            '<i class="fa-solid fa-ticket text-5xl mb-4 opacity-30"></i>' +
            '<p class="font-bold text-lg mb-2">Bạn chưa có vé nào</p>' +
            '<p class="text-sm mb-6">Hãy khám phá và đặt vé sự kiện yêu thích</p>' +
            '<a href="events.html" class="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 transition">Khám phá sự kiện</a>' +
            '</div>';
        return;
    }

    container.innerHTML = orders.map(function(o) {
        var seats = (o.seats && o.seats.length) ? o.seats.join(', ') : (o.seat || '–');
        var total = (o.total || 0).toLocaleString('vi-VN');
        return '<div class="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-pink-200 flex flex-wrap md:flex-nowrap items-center gap-6">' +
            '<div class="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white shadow-md bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-4xl flex-shrink-0">🎫</div>' +
            '<div class="flex-1 min-w-0">' +
                '<span class="bg-pink-100 text-pink-500 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Vé đã mua</span>' +
                '<h4 class="text-lg font-black mt-1 uppercase truncate">' + (o.event || 'Sự kiện') + '</h4>' +
                '<p class="text-xs font-bold text-gray-400 mt-1">Ghế: ' + seats + '</p>' +
                '<p class="text-xs font-bold text-gray-400">' + (o.date || '') + '</p>' +
                '<p class="text-sm font-black text-pink-500 mt-1">' + total + 'đ</p>' +
            '</div>' +
            '<div class="text-right flex-shrink-0">' +
                '<p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Mã đơn</p>' +
                '<p class="font-black text-blue-600 font-mono">#' + (o.id || '') + '</p>' +
                '<button onclick="viewOrderDetail(\'' + (o.id || '') + '\')" class="mt-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase transition">Chi tiết</button>' +
            '</div>' +
        '</div>';
    }).join('');
}
window.renderMyTickets = renderMyTickets;

function viewOrderDetail(orderId) {
    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    var o = orders.find(function(x) { return x.id === orderId; });
    if (!o) { openModal('modal-ticket-detail'); return; }

    // Update modal fields
    var evName = document.getElementById('ticket-event-name');
    var seat = document.getElementById('ticket-seat');
    var owner = document.getElementById('ticket-owner');
    var tid = document.getElementById('ticket-id');
    var ttime = document.getElementById('ticket-time');
    var tprice = document.getElementById('ticket-price');
    var tloc = document.getElementById('ticket-location');
    var tqr = document.getElementById('ticket-qr');

    var user = getUser();
    var seatStr = (o.seats && o.seats.length) ? o.seats.join(' · ') : (o.seat || 'N/A');

    if (evName) evName.textContent = o.event || 'Sự kiện';
    if (seat) seat.textContent = seatStr;
    if (owner) owner.textContent = o.buyer || (user ? user.name : 'Khách hàng');
    if (tid) tid.textContent = '#' + o.id;
    if (ttime) ttime.textContent = o.date || '';
    if (tprice) tprice.textContent = (o.total || 0).toLocaleString('vi-VN') + 'đ';
    if (tloc) tloc.textContent = o.location || 'EventHub Venue';
    if (tqr) tqr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EVENTHUB-' + o.id;

    openModal('modal-ticket-detail');
}
window.viewOrderDetail = viewOrderDetail;

function populateTicketModal() {
    // Fallback với vé mẫu nếu không có order
    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    if (orders.length) viewOrderDetail(orders[0].id);
}

// ═══════════════════════════════════════════════
// 10. HỒ SƠ
// ═══════════════════════════════════════════════
function loadProfileInputs(user) {
    if (!user) user = getUser();
    if (!user) return;

    var fn = document.getElementById('edit-fullname');
    var ph = document.getElementById('edit-phone');
    var addr = document.getElementById('edit-address');
    var pname = document.getElementById('profile-name-display');
    var avatar = document.getElementById('profile-avatar-preview');

    if (fn) fn.value = user.name || '';
    if (ph) ph.value = user.phone || '';
    if (addr) addr.value = user.address || '';
    if (pname) pname.textContent = user.name || 'Người dùng';
    if (avatar && user.avatar) avatar.src = user.avatar;
}

function updateUserProfile() {
    var fn = document.getElementById('edit-fullname');
    var ph = document.getElementById('edit-phone');
    var addr = document.getElementById('edit-address');

    if (!fn || !fn.value.trim()) { alert('Họ tên không được để trống!'); return; }

    var user = getUser() || {};
    user.name = fn.value.trim();
    user.phone = ph ? ph.value.trim() : (user.phone || '');
    user.address = addr ? addr.value.trim() : (user.address || '');
    if (window._tempAvatar) user.avatar = window._tempAvatar;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userLogin', JSON.stringify(user));

    // Cập nhật UI
    var wn = document.getElementById('user-welcome-name');
    if (wn) wn.textContent = user.name + ' ✨';
    var pname = document.getElementById('profile-name-display');
    if (pname) pname.textContent = user.name;
    renderAuthZone(user);

    alert('✅ Cập nhật hồ sơ thành công!');
}
window.updateUserProfile = updateUserProfile;

function changePassword() {
    var oldP = document.getElementById('old-pass');
    var newP = document.getElementById('new-pass');
    if (!oldP || !newP || !oldP.value || !newP.value) { alert('Vui lòng điền đầy đủ!'); return; }
    if (newP.value.length < 6) { alert('Mật khẩu mới phải ít nhất 6 ký tự!'); return; }

    // Kiểm tra mật khẩu cũ (với localStorage auth)
    var storedPass = localStorage.getItem('storedPass');
    if (storedPass && oldP.value !== storedPass) { alert('Mật khẩu cũ không đúng!'); return; }

    localStorage.setItem('storedPass', newP.value);
    oldP.value = '';
    newP.value = '';
    alert('✅ Đổi mật khẩu thành công!');
}
window.changePassword = changePassword;

function handleAvatarChange(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
        window._tempAvatar = ev.target.result;
        var prev = document.getElementById('profile-avatar-preview');
        if (prev) prev.src = ev.target.result;
    };
    reader.readAsDataURL(file);
}
window.handleAvatarChange = handleAvatarChange;

document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'avatar-upload') handleAvatarChange(e);
});

// ═══════════════════════════════════════════════
// 11. HOÀN TIỀN
// ═══════════════════════════════════════════════
function renderRefundTickets() {
    var container = document.getElementById('ticket-list-refund');
    if (!container) return;

    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');

    if (!orders.length) {
        container.innerHTML =
            '<div class="col-span-full text-center py-12 text-gray-400">' +
            '<i class="fa-solid fa-ticket-simple text-4xl mb-3 opacity-30"></i>' +
            '<p class="font-bold">Không có vé để hoàn tiền</p>' +
            '</div>';
        return;
    }

    container.innerHTML = orders.map(function(o) {
        var total = o.total || 0;
        var refund = Math.round(total * 0.95);
        return '<div class="bg-white p-6 rounded-[2.5rem] border-2 border-gray-50 relative overflow-hidden group hover:shadow-xl transition-all">' +
            '<div class="flex justify-between items-start mb-4">' +
                '<div class="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 text-xl"><i class="fa-solid fa-ticket"></i></div>' +
                '<div class="text-right">' +
                    '<p class="text-[10px] font-bold text-gray-400 uppercase leading-none">Mã đơn hàng</p>' +
                    '<p class="text-xs font-black text-blue-600 font-mono">#' + o.id + '</p>' +
                '</div>' +
            '</div>' +
            '<h4 class="font-black uppercase text-sm text-gray-800 mb-1 truncate">' + (o.event || 'Sự kiện') + '</h4>' +
            '<div class="space-y-1 mb-4">' +
                '<p class="text-[10px] text-gray-500 font-bold"><i class="fa-regular fa-clock mr-1"></i> ' + (o.date || '') + '</p>' +
                '<p class="text-[10px] text-gray-500 font-bold"><i class="fa-solid fa-money-bill-wave mr-1"></i> Giá vé: ' + total.toLocaleString('vi-VN') + 'đ</p>' +
            '</div>' +
            '<button onclick="openRefundModal(\'' + o.id + '\',' + total + ')" class="w-full bg-gray-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-red-600 transition-colors">Yêu cầu hoàn tiền</button>' +
        '</div>';
    }).join('');
}
window.renderRefundTickets = renderRefundTickets;

var _refundOrderId = '';
var _refundAmount = 0;

function openRefundModal(orderId, amount) {
    _refundOrderId = orderId;
    _refundAmount = amount || 0;
    var el = document.getElementById('refund-amount');
    if (el) el.textContent = Math.round(_refundAmount * 0.95).toLocaleString('vi-VN') + 'đ';
    var modal = document.getElementById('refund-modal');
    if (modal) { modal.classList.remove('hidden'); modal.classList.add('flex'); }
}
window.openRefundModal = openRefundModal;

function closeRefundModal() {
    var modal = document.getElementById('refund-modal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}
window.closeRefundModal = closeRefundModal;

function toggleOtherReason() {
    var sel = document.getElementById('refund-reason-select');
    var other = document.getElementById('other-reason-container');
    if (!sel || !other) return;
    other.classList.toggle('hidden', sel.value !== 'other');
}
window.toggleOtherReason = toggleOtherReason;

function confirmRefundRequest() {
    var sel = document.getElementById('refund-reason-select');
    var reason = sel ? sel.value : '';
    if (reason === 'other') {
        var txt = document.getElementById('refund-reason-text');
        reason = txt ? txt.value.trim() : '';
        if (!reason) { alert('Vui lòng nhập lý do hoàn tiền!'); return; }
    }

    // Xoá đơn khỏi my_orders
    var orders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    orders = orders.filter(function(o) { return o.id !== _refundOrderId; });
    localStorage.setItem('my_orders', JSON.stringify(orders));

    // Cộng tiền hoàn
    var refund = Math.round(_refundAmount * 0.95);
    var newBal = getBalance() + refund;
    saveBalance(newBal);
    animateBalance(currentBalance, newBal);

    // Thêm lịch sử
    addToHistory(refund, 'Hoàn tiền vé #' + _refundOrderId);

    closeRefundModal();
    alert('✅ Yêu cầu hoàn tiền thành công!\nBạn nhận lại: ' + refund.toLocaleString('vi-VN') + 'đ');
    renderRefundTickets();
    renderMyTickets();
}
window.confirmRefundRequest = confirmRefundRequest;

// ═══════════════════════════════════════════════
// 12. VOUCHER
// ═══════════════════════════════════════════════
window.setAmount = setAmount; // đã định nghĩa ở trên

// ═══════════════════════════════════════════════
// 13. MODAL VÉ CHI TIẾT
// ═══════════════════════════════════════════════
function updateTicketData(ticket) {
    // Không cần thiết nữa vì viewOrderDetail xử lý
}
window.updateTicketData = updateTicketData;
