let events = [
  //---Tháng 3/2026---//
  { 
    id: 1, 
    title: "Concert Blackpink: World Tour",
    desc: "Live concert Blackpink", 
    category: "Nhạc sống", 
    date: "2026-03-21", 
    location: "Sân Mỹ Đình", 
    price: "2.500.000đ", 
    hot: true, 
    img: "blackpink.jpeg" 
  },
  {
    id: 2,
    title: "Workshop: Art Therapy - Vẽ Pastel",
    desc: "Trải nghiệm vẽ pastel",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-21",
    location: "EventHub Studio",
    price: "Miễn phí",
    hot: false,
    img : "",
  },
  {
    id: 3,
    title: "Vietnam Tech Expo: AI & Future",
    desc: "Triển lãm công nghệ AI",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-05",
    location: "VNU Innovation Hub",
    price: "Miễn phí",
    hot: false,
    img: "",
  },
  {
    id: 4,
    title: "Giải Bóng đá MB Hanoi Cup 2026",
    desc: "Giải bóng đá hấp dẫn nhất Hà Nội",
    category: "Thể thao",
    date: "2026-03-25",
    location: "Sân Mỹ Đình",
    price: "200.000đ",
    hot: false,
    img: "mbhanoicup.jpeg"
  },
  {
    id: 5,
    title: "Đêm Nhạc Trịnh: Nối Vòng Tay Lớn",
    desc: "Đêm nhạc tưởng nhớ Trịnh Công Sơn",
    category: "Nhạc sống",
    date: "2026-03-28",
    location: "Nhà hát Lớn Hà Nội",
    price: "800.000đ",
    hot: false,
    img: "trinhcongson.jpeg"
  },
  {
    id: 6,
    title: "Tech Talk: Web3 & Blockchain",
    desc: "Hội thảo về Web3 và Blockchain",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-12",
    location: "Quận 1, TP.HCM",
    price: "150000đ",
    hot: false,
    img: "",
  },
  {
    id: 7,
    title: "VNU Fintech Forum 2026",
    desc: "Diễn đàn Fintech hàng đầu Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-05",
    location: "VNU-IS Hall",
    price: "Miễn phí",
    hot: false,
    img: "",
  },
  {
    id: 8,
    title: "Vietnam Cosplay Festival 2026",
    desc: "Lễ hội cosplay lớn nhất Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-10",
    location: "Công viên Thống Nhất",
    price: "120.000đ",
    hot: true,
    img: "anhtraisayhi.jpeg"
  },
  {
    id: 9,
    title: "Marathon Vì Cộng Đồng - UpRace",
    category: "Thể thao",
    date: "2026-03-15",
    location: "Hồ Gươm",
    price: "Miễn phí",
    hot: false,
    img: "marathon.jpeg"
  },
  {
    id: 10,
    title: "Vietnam Fintech Summit 2026",
    desc: "Hội nghị thượng đỉnh Fintech Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-15",
    location: "Lotte Center Hà Nội",
    price: "500.000đ",
    hot: true,
    img: "",
  },
  {
    id: 11,
    title: "VCS League Championship (LOL)",
    desc: "Giải đấu Liên Minh Huyền Thoại lớn nhất Việt Nam",
    category: "Thể thao",
    date: "2026-03-30",
    location: "GG Stadium",
    price: "100.000đ",
    hot: false,
    img: "vcs.jpeg"
  },
  {
    id: 12,
    title: "Triển lãm Vietnam Auto Expo",
    desc: "Triển lãm ô tô lớn nhất Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-20",
    location: "SECC Quận 7",
    price: "50.000đ",
    hot: false,
    img: "autoexpo.jpeg",
  },
  {
    id: 13,
    title: "Startup Pitch Night: Gen Z Innovators",
    desc: "Sự kiện pitching dành cho startup Gen Z",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-14",
    location: "Hà Nội Hub",
    price: "Miễn phí",
    hot: false,
    img: "",
  },
  {
    id: 14,
    title: "Jazz Under The Stars: Moonlight",
    category: "Nhạc sống",
    date: "2026-03-14",
    location: "Skyline Bar",
    price: "350.000đ",
    hot: false,
    img: "jazz.jpeg"
  },
  {
    id: 15,
    title: "Lễ Hội Ánh Sáng: Heritage Night",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-14",
    location: "Phố đi bộ",
    price: "150.000đ",
    hot: false,
    img: "lehoianhsang.jpeg"
  },
  {
    id: 16,
    title: "Giải Cờ Vua Quốc Tế HDBank",
    desc: "Giải cờ vua quốc tế hấp dẫn nhất Việt Nam",
    category: "Thể thao",
    date: "2026-03-18",
    location: "Khách sạn Melia Hà Nội",
    price: "Miễn phí",
    hot: false,
    img: "cocua.jpeg"
  },
  {
    id: 17,
    title: "K-Pop Festa Summer 2026",
    desc: "Lễ hội K-Pop lớn nhất Việt Nam",
    category: "Nhạc sống",
    date: "2026-06-20",
    location: "Sân Quần Ngựa",
    price: "1.800.000đ",
    hot: false,
    img: "kpopfesta.jpeg"
  },
  {
    id: 18,
    title: "Workshop: Nghệ thuật Gốm Bát Tràng",
    desc: "Trải nghiệm làm gốm truyền thống",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-21",
    location: "Bát Tràng Studio",
    hot: false,
    price: "450000đ",
    img: "gom.jpg"
  },
  {
    id: 19,
    title: "Ngày hội Sách và Văn hóa Đọc",
    desc: "Sự kiện sách lớn nhất Hà Nội",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-22",
    location: "Đường Sách 19/12",
    hot: false,
    price: "Miễn phí",
    img: "sach.jpg"
  },
  {
    id: 20,
    title: "VNU Data Science Seminar",
    desc: "Hội thảo khoa học dữ liệu tại VNU",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-26",
    location: "VNU Sunwah",
    price: "Miễn phí",
    hot: false,
    img: "vba.jpeg"
  },
  {
    id: 21,
    title: "Rap Việt Star",
    desc: "Giải rap Việt Nam",
    category: "Nhạc sống",
    date: "2026-03-28",
    location: "SECC Quận 7",
    price: "1.200.000đ",
    hot: true,
    img: "rapviet.jpeg"
  },
  {
    id: 22,
    title: "Sáng sớm cùng Yoga Heritage",
    desc: "Buổi tập yoga ngoài trời tại Heritage",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-01",
    location: "Bờ Hồ Gươm",
    price: "Miễn phí",
    hot: false,
    img: "yoga.jpeg"
  },
  {
    id: 23,
    title: "Coffee Talk: AI in Visual Art",
    desc: "Buổi trò chuyện về AI trong nghệ thuật thị giác",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-01",
    location: "The Coffee House",
    price: "50.000đ",
    hot: false,
    img: "coffeetalk.jpeg"
  },
  {
    id: 24,
    title: "Workshop: Kỹ Năng Tư Duy Phản Biện",
    desc: "Trải nghiệm kỹ năng tư duy phản biện",
    category: "Tham quan & Trải nghiệm",
    date: "2026-03-02",
    location: "The Coffee House",
    price: "80.000đ",
    hot: false,
    img: "workshop.jpeg"
  },
  {
    id: 25,
    title: "Concert: Anh Trai Say Hi (Live)",
    desc: "Live concert của Anh Trai Say Hi",
    category: "Nhạc sống",
    date: "2026-03-02",
    time: "19:00",
    location: "Sân Mỹ Đình",
    price: "1.000.000đ",
    hot: true,
    img: "anhtraisayhi.jpeg"
  },
  {
    id: 53,
    title: "GreenGreen Cortis",
    desc: "Live concert",
    category: "Nhạc sống",
    date: "2026-04-20",
    time: "19:00",
    location: "Vincom center",
    price: "1.500.000đ",
    hot: true,
    img: "cortis.jpg"
  },
  {
    id: 26,
    title: "Arirang World Tour",
    desc: "Live concert Arirang",
    category: "Nhạc sống",
    date: "2026-03-08",
    location: "Sân vận động EL Campin",
    price: "1.000.000đ",
    hot: true,
    img: "arirang.jpeg"
  },
  //---Tháng 4/2026---//
  {
    id: 27,
    title: "VNU-IS Fintech Summit 2026",
    desc: "Hội nghị thượng đỉnh Fintech tại VNU-IS",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-02",
    location: "Hội trường Sunwah",
    price: "Miễn phí",
    hot: false,
    img: "vnuis.jpeg"
  },
  {
    id: 28,
    title: "Live Acoustic: Soul of Hanoi",
    desc: "Đêm nhạc acoustic tại Hà Nội",
    category: "Nhạc sống",
    date: "2026-04-03",
    location: "Tranquil Books & Coffee",
    price: "150.000đ",
    hot: false,
    img: "acoustic.jpeg"
  },
  {
    id: 29,
    title: "VnExpress Marathon Hanoi Midnight",
    desc: "Marathon chạy đêm tại Hà Nội",
    category: "Thể thao",
    date: "2026-04-05",
    location: "Hồ Hoàn Kiếm",
    price: "450.000đ",
    hot: false,
    img: "marathon.jpeg"
  },
  {
    id: 30,
    title: "Triển lãm Xe độ & Phụ kiện",
    desc: "Triển lãm xe độ và phụ kiện ô tô",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-05",
    location: "TT Triển lãm I.C.E",
    price: "100.000đ",
    hot: false,
    img: "workshop.jpeg"
  },
  {
    id: 31,
    title: "Workshop Digital Marketing Performance",
    desc: "Trải nghiệm kỹ năng Digital Marketing Performance",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-07",
    location: "Coworking Space Q1",
    price: "200.000đ",
    hot: false,
    img: "",
  },
  {
    id: 32,
    title: "Lễ hội Văn hóa Nhật Bản",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-10",
    location: "Công viên Thống Nhất",
    price: "50.000đ",
    hot: false,
    img: "lehoianhsang.jpeg"
  },
  {
    id: 33,
    title: "Concert Sơn Tùng M-TP: Sky Tour",
    category: "Nhạc sống",
    date: "2026-04-11",
    location: "Sân Mỹ Đình",
    price: "1.500.000đ",
    hot: false,
    img: "sontung.jpeg"
  },
  {
    id: 34,
    title: "Hội chợ Sách Quốc tế Việt Nam",
    category: "Hội thảo & Workshop",
    date: "2026-04-12",
    location: "Hoàng Thành Thăng Long",
    price: "Miễn phí",
    hot: false,
    img: "",
  },
  {
    id: 35,
    title: "FPT Tech Day: Blockchain World",
    desc: "",
    category: "Hội thảo & Workshop",
    date: "2026-04-14",
    location: "FPR Tower",
    price: "Miễn phí",
    hot: false,
    img: "https://media.licdn.com/dms/image/v2/D4E22AQG_cd3EOlRseA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731594519669?e=2147483647&v=beta&t=zgHTpugMifIQQ0K7Y1PtTizBTgQ2e2sjsx03fSZxbyw",
  },
  {
    id: 36,
    title: "Workshop: Cắm Hoa Ikebana Nhật Bản",
    desc: "Trải nghiệm nghệ thuật cắm hoa Ikebana",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-15",
    location: "Tiệm Hoa Xinh",
    price: "350.000đ",
    hot: false,
    img: "cammhoa.jpeg"
  },
  {
    id: 37,
    title: "Giải Bóng rổ VBA 3x3 Prime",
    desc: "Giải bóng rổ 3x3 hấp dẫn nhất Việt Nam",
    category: "Thể thao",
    date: "2026-04-17",
    location: "Nhà thi đấu Thanh Xuân",
    price: "120.000đ",
    hot: false,
    img: "https://i.ytimg.com/vi/296V9663Vng/maxresdefault.jpg"
  },
  {
    id: 38,
    title: "TEDx VNU-IS: Beyond Limits",
    desc: "",
    category: "Hội thảo & Workshop",
    date: "2026-04-18",
    location: "VNU International School",
    price: "300.000đ",
    img:"https://th.bing.com/th/id/R.03a15486b49fa9151e9f32b42acfee05?rik=7ppGXnifs9R1mQ&riu=http%3a%2f%2fgreenideahouse.com%2fwp-content%2fuploads%2f2014%2f08%2fBeyondLimits-3.jpg&ehk=gmvR5pzCUZnfc33b9lc6kBwb6upAn9ykLwypHRSjsj0%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 39,
    title: "Hài Độc Thoại: Saigon Comic Night",
    category: "Sân khấu & Nghệ thuật",
    date: "2026-04-18",
    location: "Rotunda Bar",
    price: "250.000",
    img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/571238450_1371377057969678_1824108918891925736_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7e0d18&_nc_eui2=AeGqRAr7-3bpvg2JOW8O7LH0rL1NQRiqYlmsvU1BGKpiWS4KCeD1hhvDn60MMW6rC07mL9iSvR2Z00KQgeO12NcT&_nc_ohc=h9ak4ZLAu40Q7kNvwEPHjdO&_nc_oc=Adpk6YDCvCY_m7acpylgpsfqunF2-Kq2K-ZepyWvCXOSc8TEYA2y0TE6w1YTFlAAgLk&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=zUo7KZR-sMJAbdCm9aI9Kw&_nc_ss=7a3a8&oh=00_Af0Cxtt-oJ6HcNZ7y0Pty2CJ70yyoqtrzsfa-iWK9EMNZg&oe=69D6B8AB",
  },
  {
    id: 40,
    title: "Workshop: Tinh hoa ẩm thực Sushi",
    desc: "Trải nghiệm kỹ năng nấu ăn Sushi",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-19",
    location: "Học viện Ẩm thực",
    price: "500.000đ",
    hot: false,
    img: "https://sushiworld.com.vn/wp-content/uploads/2023/05/1.jpg"
  },
  {
    id: 41,
    title: "Talkshow: AI & Ethical Dilemmas",
    desc: "Buổi trò chuyện về AI và các vấn đề đạo đức",
    category: "Hội thảo & Workshop",
    date: "2026-04-21",
    location: "Hội trường Sunwah",
    price: "200.000đ",
    hot: false,
    img: "https://tse4.mm.bing.net/th/id/OIP.le0iSvXTSAAYOakI9doYKQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 42,
    title: "Hội thảo: Săn học bổng Ivy League",
    desc: "Hội thảo về cơ hội học bổng tại các trường đại học Ivy League",
    category: "Hội thảo & Workshop",
    date: "2026-04-22", time: "8:30",
    location: "Khách sạn Daewoo",
    price: "Miễn phí",
    hot: false,
    img: "https://scientia.edu.vn/wp-content/uploads/2024/08/hoc-bong-ivy-league.jpg",
  },
  {
    id: 43,
    title: "Workshop: Vẽ Tranh Acrylic Summer",
    desc: "Trải nghiệm vẽ tranh acrylic mùa hè",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-25", time: "14:30",
    location: "Art Center",
    price: "400.000đ",
    hot: false,
  },
  {
    id: 44,
    title: "Hay Glamping Music Festival",
    desc: "Lễ hội âm nhạc ngoài trời tại Hay Glamping",
    category: "Nhạc sống",
    date: "2026-04-25", time: "16:00",
    location: "EcoPark",
    price: "850.000đ",
    hot: false,
    img: "https://hololab.vn/wp-content/uploads/2023/12/Le-hoi-HAY-Glamping-Music-Festival-1024x1024.jpeg"
  },
  {
    id: 45,
    title: "Triển lãm: Di sản Sơn mài Việt",
    desc: "Triển lãm nghệ thuật sơn mài truyền thống Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-26", time: "9:00",
    location: "Bảo tàng Mỹ thuật",
    price: "40.000đ",
    hot: false,
    img: "https://tse4.mm.bing.net/th/id/OIP.cy5yy7ZYgedBctTDho13IwHaER?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 46,
    title: "Workshop: Nghệ thuật Latte Art",
    desc: "Trải nghiệm kỹ năng pha chế cà phê với nghệ thuật latte art",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-27", time: "15:00",
    location: "Aha Coffee Training",
    price: "300.000đ",
    hot: false,
    img: "https://tse3.mm.bing.net/th/id/OIP.rEDjZDqIOdGPBeV689XSBQHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 47,
    title: "Street Food Festival: Việt Nam vị ngon",
    desc: "Lễ hội thực phẩm đường phố với các món ăn đặc sản Việt Nam",
    category: "Tham quan & Trải nghiệm",
    date: "2026-04-29", time: "17:00",
    location: "Phố đi bộ Hoàn Kiếm",
    price: "Vào cửa tự do",
    hot: false,
    img: "",
  },
  {
    id: 48,
    title: "Concert Tổ quốc 30/4 -1/5",
    file: "index.html",
    desc: "Đêm nhạc kỷ niệm ngày giải phóng miền Nam",
    category: "Nhạc sống",
    date: "2026-04-30", time: "20:00",
    location: "Quảng trường Ba Đình",
    price: "Miễn phí",
    hot: true,
    img: "concerttoquoc.jpg"
  },
  //---Tháng 7/2026---//
  {
    id: 157,
    title: "Triển lãm Harry Potter: Trải nghiệm phép thuật",
    desc: "Triển lãm phép thuật",
    category: "Tham quan & Trải nghiệm",
    date: "2026-07-31",
    location: "Bảo tàng Harry Potter",
    price: "200.000đ",
    hot: true,
    img: "harrypotter.jpeg",
  },
  {
    title: "Bảo tàng chiêm tinh học",
    desc: "Khám phá vũ trụ",
    category: "Tham quan & Trải nghiệm",
    date: "2026-06-19",
    location: "Hòa Lạc, Hà Nội",
    price: "150.000đ",
    hot: true,
    img: "chiemtinh.jpeg"
  },
];

// ===== RENDER =====
function renderEvents(filter = "all") {
  let list = document.getElementById("eventList");
  list.innerHTML = "";

  let filtered = events.filter(e =>
    filter === "all" || e.category === filter
  );

  filtered.forEach(e => {
    list.innerHTML += `
      <div class="card" onclick="goToanhtraisayhi('${e.title}', '${e.date}','${e.location}', '${e.price}', '${e.img}')">
        <div class="card-img">
          <img src="${e.img}">
          ${e.hot ? `<div class="tag">HOT</div>` : ""}
        </div>
        <div class="info">
          <h4>${e.title}</h4>
          <div class="meta">${e.date} • ${e.location}</div>
          <div class="bottom">
            <span class="price">${e.price}</span>
            <button class="buy-btn">Mua vé</button>
          </div>
        </div>
      </div>
    `;
  });

filtered.forEach(e => {
  list.innerHTML += `
    <div class="card" onclick="handleClick(${e.id})">
      
      <div class="card-img">
        <img src="${e.img}">
        ${e.hot ? `<div class="tag">HOT</div>` : ""}
      </div>

      <div class="info">
        <h4>${e.title}</h4>
        <div class="meta">${e.date} • ${e.location}</div>

        <div class="bottom">
          <span class="price">${e.price}</span>
          <button class="buy-btn" onclick="event.stopPropagation()">Mua vé</button>
        </div>

      </div>
    </div>
  `;
});
}

// ===== HOT =====
// --- Cập nhật lại logic Render ---
function renderEvents(filter = "all") {
  let list = document.getElementById("eventList");
  if (!list) return;
  list.innerHTML = "";

  // Lọc danh sách theo category
  let filtered = events.filter(e =>
    filter === "all" || e.category === filter
  );

  filtered.forEach(e => {
    // Chỉ render 1 lần duy nhất mỗi card
    list.innerHTML += `
      <div class="card" onclick="handleClick(${e.id})">
        <div class="card-img">
          <img src="${e.img}" onerror="this.src='https://via.placeholder.com/400x200'">
          ${e.hot ? `<div class="tag">HOT</div>` : ""}
        </div>
        <div class="info">
          <h4>${e.title}</h4>
          <div class="meta">${e.date} • ${e.location}</div>
          <div class="bottom">
            <span class="price">${e.price}</span>
            <button class="buy-btn" onclick="handleBuyClick(event, ${e.id})">Mua vé</button>
          </div>
        </div>
      </div>
    `;
  });
}

// --- Hàm xử lý khi nhấn nút "Mua vé" ---
function handleBuyClick(event, id) {
  event.stopPropagation(); // Ngăn sự kiện click lan ra thẻ card (tránh mở Modal)
  
  let selectedEvent = events.find(ev => ev.id === id);
  if (!selectedEvent) return;

  // KIỂM TRA: Nếu sự kiện có file riêng (như index.html của 30/4)
  if (selectedEvent.file) {
    window.location.href = selectedEvent.file; // Nhảy sang trang intro con rồng
  } else {
    // Nếu không có file intro, nhảy sang trang đặt vé mặc định
    // Truyền ID qua URL để trang sau biết đang mua vé cho sự kiện nào
    window.location.href = `anhtraisayhi.html?id=${id}`;
  }
}

// --- Hàm xử lý khi nhấn vào bất kỳ đâu trên card (trừ nút mua vé) ---
function handleClick(id) {
  let selectedEvent = events.find(ev => ev.id === id);
  if (!selectedEvent) return;

  // Nếu là sự kiện 30/4, nhấn vào hình cũng cho xem intro luôn
  if (selectedEvent.file) {
    window.location.href = selectedEvent.file;
  } else {
    // Hiện modal thông tin chi tiết như cũ
    openDetail(selectedEvent.title, selectedEvent.desc || "Không có mô tả chi tiết.");
  }
}

// Đảm bảo gọi lại hàm khởi tạo
renderEvents();
renderHot();

// 1. Sửa hàm handleClick: Nhấn vào đâu trên card cũng chạy intro nếu có
function handleClick(id) {
  let e = events.find(ev => ev.id === id);
  if (!e) return;

  if (e.file) {
    // Nếu có intro (như sự kiện 30/4), chuyển đến index.html
    window.location.href = e.file;
  } else {
    // Event bình thường thì mở modal chi tiết
    openDetail(e.title, e.desc || "Không có mô tả");
  }
}

// 2. Bổ sung hàm handleBuyClick: Đảm bảo nút "Mua vé" hoạt động
function handleBuyClick(event, id) {
  event.stopPropagation(); // Ngăn việc mở modal chi tiết khi nhấn nút
  let e = events.find(ev => ev.id === id);
  if (!e) return;

  if (e.file) {
    // Nhấn "Mua vé" của sự kiện 30/4 cũng dẫn vào intro trước
    window.location.href = e.file;
  } else {
    // Các sự kiện khác nhảy thẳng tới trang đặt vé
    window.location.href = "anhtraisayhi.html";
  }
}