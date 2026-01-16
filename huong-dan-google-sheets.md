# Hướng Dẫn Cài Đặt Google Sheets Backend

Hướng dẫn này giúp bạn thiết lập backend Google Sheets miễn phí để lưu trữ metadata wallpaper. Ảnh được host trên Catbox.moe, còn Google Sheets lưu URL và thông tin.

---

## Bước 1: Tạo Google Sheet

1. Truy cập [https://sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** để tạo bảng tính mới
3. Đặt tên: "ShareDesktopMe Database"
4. Trong Row 1, tạo các cột headers sau:

| A | B | C | D | E |
|---|---|---|---|---|
| url | title | category | description | date |

⚠️ **QUAN TRỌNG**: Tên cột phải chính xác (chữ thường, không có dấu cách)!

---

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** → **Apps Script**
2. Xóa hết code mặc định trong editor
3. **COPY VÀ PASTE CODE NÀY** (đã sửa đúng):

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  }).filter(item => item.url);
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // THỨ TỰ CỘT: url, title, category, description, date
    sheet.appendRow([
      data.url,                    // Cột A - URL ảnh từ Catbox
      data.title,                  // Cột B - Tiêu đề
      data.category,               // Cột C - Danh mục (pc/mobile)
      data.description || '',      // Cột D - Mô tả (tùy chọn)
      new Date().toISOString()     // Cột E - Ngày upload (tự động)
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click icon **Save** (💾) hoặc nhấn `Ctrl+S`
5. Đặt tên project: "ShareDesktopMe API"

---

## Bước 3: Deploy Web App

1. Click **Deploy** → **New deployment**
2. Click icon bánh răng ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: ShareDesktopMe API v1
   - **Execute as**: Me (email của bạn)
   - **Who has access**: **Anyone** ⚠️ (Quan trọng!)
5. Click **Deploy**
6. **Cấp quyền truy cập** khi được yêu cầu:
   - Click "Authorize access"
   - Chọn tài khoản Google của bạn
   - Click "Advanced" → "Go to ShareDesktopMe API (unsafe)"
   - Click "Allow"
7. **Copy Web App URL** - sẽ có dạng:
   ```
   https://script.google.com/macros/s/AKfycbxxx.../exec
   ```

---

## Bước 4: Cập Nhật Website

Mở file `js/app.js` và thay URL trong CONFIG:

```javascript
apiUrl: {
    get: 'URL_CỦA_BẠN_Ở_ĐÂY',
    post: 'URL_CỦA_BẠN_Ở_ĐÂY'  // Cùng 1 URL
}
```

---

## ⚠️ Lưu Ý Quan Trọng

### Thứ Tự Cột Phải Khớp:
| Website gửi | → | Sheet nhận |
|-------------|---|------------|
| data.url | → | Cột A (url) |
| data.title | → | Cột B (title) |
| data.category | → | Cột C (category) |
| data.description | → | Cột D (description) |
| new Date() | → | Cột E (date) |

### Test GET:
Mở URL web app trên browser:
- Nếu thấy `[]` hoặc JSON array → OK!
- Nếu thấy HTML error → Kiểm tra lại code

### Test Upload:
1. Upload ảnh từ website
2. Kiểm tra Google Sheet có row mới
3. Refresh website → Ảnh hiển thị

---

## 🔧 Xử Lý Lỗi Thường Gặp

### Lỗi "Content Service" có dấu cách:
❌ Sai: `return Content Service`
✅ Đúng: `return ContentService` (không có dấu cách!)

### Lỗi thứ tự cột không khớp:
Đảm bảo `sheet.appendRow()` theo thứ tự: `url, title, category, description, date`

### Lỗi CORS:
Website đã cấu hình CORS Proxy - upload sẽ hoạt động từ mọi domain!

---

## ✅ Checklist Hoàn Thành

- [ ] Tạo Google Sheet với 5 cột headers
- [ ] Paste code Apps Script (đã sửa đúng)
- [ ] Deploy web app với "Anyone" access
- [ ] Copy URL và paste vào `js/app.js`
- [ ] Test GET trên browser
- [ ] Test upload từ website
