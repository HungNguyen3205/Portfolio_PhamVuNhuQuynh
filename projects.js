// Original works stay on Drive. Categories are presentation groupings; edit here.
export const driveFolder = 'https://drive.google.com/drive/folders/12FYIlcmUwB5rVXde-aa5a-y1Ctvjkugh';
export const projects = [
  { id: '1ewDacfxgm4QCSZoDbjs87cEFPGVy_mxa', title: 'Dior Addict · Lip Glow', file: 'possterr copy.jpg', category: 'Poster', tone: 'pink' },
  { id: '1h0nooOKPnQAKpZw0QNYjOczyVK5tnwe9', title: 'Vinamilk · Poster', file: 'poster vinamilk.png', category: 'Poster', tone: 'blue' },
  { id: '1xF68DCSp0ErBYgXlMuekdSyGiEYXRL_J', title: 'Mockup món ăn', file: 'mockup món ăn dọc.png', category: 'Mockup', tone: 'sand' },
  { id: '1bt6vvzVaKY8TSc4FW4n6wXy_ei3Ekp3f', title: 'Moodboard logo', file: 'MOADBOAD LOGO-06.png', category: 'Logo', tone: 'olive' },
  { id: '1i-RLjOKSgbJ5ADWU0ct90go6iHyZLbFX', title: 'Thiết kế 01', file: 'xuất lần 2.jpg', category: 'Khác', tone: 'red' },
  { id: '1SDk7bHCEIO8qruWvaVjckzEvyYyg5rHN', title: 'Thiết kế 02', file: 'IMG_7384 2 copy.jpg', category: 'Khác', tone: 'sand' },
  { id: '1sGFSbJ0e5gCKV6rv_DUXd1k7wYzXZlPP', title: 'Bài cuối khóa', file: 'Bài cuối khóa.png', category: 'Khác', tone: 'olive' },
  { id: '16K7wS18xXkqs7f0p_DUzL1QSpGZ8qqkL', title: 'Thiết kế banner', file: 'bner.jpg', category: 'Banner', tone: 'red' },
  { id: '1Jm15dSpt9OoH3s9rSTp_sbUeGcc21ddh', title: 'Poster ngang', file: 'poster ngang.png', category: 'Poster', tone: 'blue' },
  { id: '1hjYAuvXPrVbIP4Bx3YUK9QzPcS6G6yqr', title: 'Poster · Phiên bản hoàn thiện', file: 'possterr cuối cùng.png', category: 'Poster', tone: 'pink' },
  { id: '1928web_P9CG4YgiOah1tEjwWaFACBecF', title: 'Thiết kế poster 03', file: 'poster.ct.png', category: 'Poster', tone: 'sand' },
  { id: '1cTAX_oU3k-h3nStKgkN1aQeBEHeY3ZoM', title: 'Thử nghiệm thị giác', file: 'Untitled-2.2.png', category: 'Khác', tone: 'red' },
  { id: '18S7nzppWJAzdlKFKN_5NVnJ0ObfAQ8GO', title: 'Mockup ấn phẩm', file: 'MOCKUP.png', category: 'Mockup', tone: 'olive' },
  { id: '1EICkBYxRsMTX9UgVTeJxbJTZ2xIZ1eVg', title: 'VNM · Mockup', file: 'MOCKUP VNM.jpg', category: 'Mockup', tone: 'blue' },
  { id: '1GsmciRaK2YjCjI308WOfDFFhwTaZu3z1', title: 'Giải thưởng họa · Ấn phẩm', file: 'GIẢI THƯỞNG HỌA.png', category: 'Khác', tone: 'sand' },
  { id: '1l2WncEDW_8hx-ynpHYqExcAkuPCgFA4t', title: 'Thiết kế poster 04', file: 'POSTER.png', category: 'Poster', tone: 'red' },
];
export const imageUrl = (id, size = 1200) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${size}`;
export const originalUrl = id => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
// Add verified contact URLs here when the owner supplies them. Empty entries are hidden.
export const contacts = { email: '', behance: '', instagram: '' };
