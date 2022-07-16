// Tạo đối tượng nhân viên bao gồm các thuộc tính
function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCoBan = 0;
  this.chucVu = "";
  this.gioLamTrongThang = 0;
  this.tongLuong = 0;
  this.loaiNhanVien = "";
  this.tinhTongLuong = function () {
    var tongLuong = 0;
    if (this.chucVu === "Sếp") {
      tongLuong = Number(this.luongCoBan) * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      tongLuong = Number(this.luongCoBan) * 2;
    } else if (this.chucVu === "Nhân viên") {
      tongLuong = Number(this.luongCoBan);
    }
    return tongLuong;
  };
  this.xepLoai = function () {
    var xepLoai = "";
    var gioLam = Number(this.gioLamTrongThang);
    if (gioLam >= 192) {
      xepLoai = "Xuất sắc";
    } else if (gioLam >= 176 && gioLam < 192) {
      xepLoai = "Giỏi";
    } else if (gioLam >= 160 && gioLam < 176) {
      xepLoai = "Khá";
    } else if (gioLam < 160) {
      xepLoai = "Trung bình";
    }
    return xepLoai;
  };
}
