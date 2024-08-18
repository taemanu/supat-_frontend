
// ฟังก์ชันแปลงเงินไทย
export function formatPrice(price) {
    return price.toLocaleString("th-TH");
}

// ฟังก์ชันแปลงวันที่เป็นรูปแบบ วัน/เดือน/ปี (พ.ศ.)
export function formatThaiDate(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear() + 543; // แปลงเป็นปีพุทธศักราช

    return `${day}/${month}/${year}`;
}

// ฟังก์ชันแปลงวันที่เป็นรูปแบบ วัน เดือน ปี (พ.ศ.)
export function formatThaiDateLong(isoString) {
    const date = new Date(isoString);
    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const day = date.getUTCDate();
    const month = thaiMonths[date.getUTCMonth()];
    const year = date.getUTCFullYear() + 543;

    return `${day} ${month} ${year}`;
}

// ฟังก์ชันแปลงวันที่เป็นรูปแบบ เวลา (24 ชั่วโมง)
export function formatTime(isoString) {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

// ฟังก์ชันแปลงวันที่เป็นรูปแบบ วัน/เดือน/ปี เวลา
export function formatThaiDateTime(isoString) {
    const datePart = formatThaiDate(isoString);
    const timePart = formatTime(isoString);

    return `${datePart} ${timePart}`;
}

export function validateMoneyInput(value) {
    // ลบตัวอักษรที่ไม่ใช่ตัวเลขหรือจุดทศนิยม
    // const sanitizedValue = value.replace(/[^\d.]/g, '');
    
    // ใช้ regex เพื่อตรวจสอบรูปแบบ
    const regex = /^\d*\.?\d{0,2}$/;
    
    if (regex.test(value)) {
      return value;
    } else {
      // ถ้าไม่ตรงตามรูปแบบ ให้ตัดตัวสุดท้ายออก
    //   return sanitizedValue.slice(0, -1);
        return ''
    }
}
  
// ฟังก์ชันสำหรับฟอร์แมตการแสดงผลเป็นรูปแบบเงิน
export function formatMoney(value) {
    const number = parseFloat(value);
    if (isNaN(number)) {
        return '';
    }
    return number.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}