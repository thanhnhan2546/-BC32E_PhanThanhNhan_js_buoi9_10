// Mảng Nhân Viên
var mangNhanVien = [];

// RESET Modal
document.querySelector("#btnThem").onclick = function () {
  // disable button cập nhật
  document.querySelector("#btnCapNhat").disabled = true;

  document.querySelector("#tknv").disabled = false;
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = "";
  document.querySelector("#datepicker").value = "";
};

// Thêm
document.querySelector("#btnThemNV").onclick = function () {
  //   Tạo đối tượng nhân viên
  var nv = new NhanVien();

  //   Lấy thông tin từ input
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;

  var ngayLam = document.querySelector("#datepicker").value;
  nv.ngayLam = moment(ngayLam).format("MM/DD/YYYY");
  nv.luongCoBan = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLamTrongThang = document.querySelector("#gioLam").value;
  nv.tongLuong = nv.tinhTongLuong();
  nv.loaiNhanVien = nv.xepLoai();

  /**-------------Validation------------------ */

  var valid = true;

  // Validation Tài khoản
  valid &=
    ktraDodai(nv.taiKhoan, "#tbTKNV", "Tài khoản", 4, 6) &
    ktraRong(nv.taiKhoan, "#tbTKNV", "Tài khoản");

  // Validation Họ tên
  valid &=
    ktraTatCaKyTu(nv.hoTen, "#tbTen", "Họ và tên") &
    ktraRong(nv.hoTen, "#tbTen", "Họ và tên");

  //  Validation Email
  valid &=
    ktraEmail(nv.email, "#tbEmail", "Email") &
    ktraRong(nv.email, "#tbEmail", "Email");

  // Validation Mật khẩu
  valid &=
    ktraDodai(nv.matKhau, "#tbMatKhau", "Mật khẩu", 6, 10) &
    ktraPassword(nv.matKhau, "#tbMatKhau", "Mật khẩu") &
    ktraRong(nv.matKhau, "#tbMatKhau", "Mật Khẩu");

  // Validation Ngày làm
  valid &=
    ktraNgay(ngayLam, "#tbNgay", "Ngày làm") &
    ktraRong(ngayLam, "#tbNgay", "Ngày làm");

  // Validation Lương cơ bản
  valid &=
    ktraGiaTri(nv.luongCoBan, "#tbLuongCB", "Lương cơ bản", 1e6, 2e7) &
    ktraRong(nv.luongCoBan, "#tbLuongCB", "Lương cơ bản");

  // Validation Chức vụ
  valid &= ktrGiaTriSai(nv.chucVu, "#tbChucVu", "Chức vụ", "Chọn chức vụ");

  // Validation Số giờ làm
  valid &=
    ktraGiaTri(nv.gioLamTrongThang, "#tbGiolam", "Giờ làm", 80, 200) &
    ktraRong(nv.gioLamTrongThang, "#tbGiolam", "Giờ làm");

  if (!valid) {
    return;
  }

  // Thông báo thêm thành công
  alert("Thêm thành công nhân viên có tài khoản " + nv.taiKhoan);

  //   Thêm vào mảng Nhân Viên
  mangNhanVien.push(nv);
  //   Xuất ra bảng
  renderTable(mangNhanVien);

  //   Lưu vào local
  setLocalStorage();

  //   Đóng Modal
  $("#myModal").modal("hide");
};

// Xóa
function xoaNhanVien(taiKhoanDel) {
  // Tìm tài khoản cần xóa
  var indexDel = mangNhanVien.findIndex((nv) => nv.taiKhoan === taiKhoanDel);
  // Kiểm tra xem tài khoản có trong mảng không, nếu có thì xóa
  if (indexDel !== -1) {
    mangNhanVien.splice(indexDel, 1);

    // Thông báo xóa nhân viên
    alert("Xóa thành công nhân viên có tài khoản " + taiKhoanDel);

    // tạo lại danh sách sau khi xóa
    renderTable(mangNhanVien);

    // lưu lại local
    setLocalStorage();

    // Đóng modal
    $("#myModal").modal("hide");
  }
}

// Sửa
function suaNhanVien(taiKhoanEdit) {
  // Tìm tài khoản càn sửa
  var indexEdit = mangNhanVien.findIndex((nv) => nv.taiKhoan === taiKhoanEdit);

  // Lấy thông tin nhân viên tại vị trí đó
  var nvEdit = mangNhanVien[indexEdit];

  //   Khóa nút Thêm
  document.querySelector("#btnThemNV").disabled = true;

  // Khóa trường tài khoản không cho chỉnh sửa
  document.querySelector("#tknv").disabled = true;

  //  Gán các giá trị lên giao diện
  document.querySelector("#tknv").value = nvEdit.taiKhoan;
  document.querySelector("#name").value = nvEdit.hoTen;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.matKhau;
  document.querySelector("#luongCB").value = nvEdit.luongCoBan;
  document.querySelector("#chucvu").value = nvEdit.chucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLamTrongThang;
  document.querySelector("#datepicker").value = moment(
    nvEdit.ngayLam,
    "MM/DD/YYYY"
  ).format("MM/DD/YYYY");
}
document.querySelector("#btnCapNhat").onclick = function () {
  var nv = new NhanVien();

  // Lấy thông tin từ input
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;

  var ngayLam = document.querySelector("#datepicker").value;
  nv.ngayLam = moment(ngayLam).format("MM/DD/YYYY");
  nv.luongCoBan = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLamTrongThang = document.querySelector("#gioLam").value;
  nv.tongLuong = nv.tinhTongLuong();
  nv.loaiNhanVien = nv.xepLoai();

  /**-------------Validation------------------ */

  var valid = true;

  // Validation Tài khoản
  valid &=
    ktraDodai(nv.taiKhoan, "#tbTKNV", "Tài khoản", 4, 6) &
    ktraRong(nv.taiKhoan, "#tbTKNV", "Tài khoản");

  // Validation Họ tên
  valid &=
    ktraTatCaKyTu(nv.hoTen, "#tbTen", "Họ và tên") &
    ktraRong(nv.hoTen, "#tbTen", "Họ và tên");

  //  Validation Email
  valid &=
    ktraEmail(nv.email, "#tbEmail", "Email") &
    ktraRong(nv.email, "#tbEmail", "Email");

  // Validation Mật khẩu
  valid &=
    ktraDodai(nv.matKhau, "#tbMatKhau", "Mật khẩu", 6, 10) &
    ktraPassword(nv.matKhau, "#tbMatKhau", "Mật khẩu") &
    ktraRong(nv.matKhau, "#tbMatKhau", "Mật Khẩu");

  // Validation Ngày làm
  valid &=
    ktraNgay(ngayLam, "#tbNgay", "Ngày làm") &
    ktraRong(ngayLam, "#tbNgay", "Ngày làm");

  // Validation Lương cơ bản
  valid &=
    ktraGiaTri(nv.luongCoBan, "#tbLuongCB", "Lương cơ bản", 1e6, 2e7) &
    ktraRong(nv.luongCoBan, "#tbLuongCB", "Lương cơ bản");

  // Validation Chức vụ
  valid &= ktrGiaTriSai(nv.chucVu, "#tbChucVu", "Chức vụ", "Chọn chức vụ");

  // Validation Số giờ làm
  valid &=
    ktraGiaTri(nv.gioLamTrongThang, "#tbGiolam", "Giờ làm", 80, 200) &
    ktraRong(nv.gioLamTrongThang, "#tbGiolam", "Giờ làm");

  if (!valid) {
    return;
  }

  //   Tìm nhân viên cần chỉnh sửa trong mảng Nhân Viên
  var indexEdit = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === nv.taiKhoan
  );

  //   Thay đổi nhân viên cần sửa trong mảng thành thông tin trên giao diện
  mangNhanVien[indexEdit].hoTen = nv.hoTen;
  mangNhanVien[indexEdit].email = nv.email;
  mangNhanVien[indexEdit].matKhau = nv.matKhau;
  mangNhanVien[indexEdit].ngayLam = nv.ngayLam;
  mangNhanVien[indexEdit].luongCoBan = nv.luongCoBan;
  mangNhanVien[indexEdit].chucVu = nv.chucVu;
  mangNhanVien[indexEdit].gioLamTrongThang = nv.gioLamTrongThang;
  mangNhanVien[indexEdit].tongLuong = nv.tongLuong;
  mangNhanVien[indexEdit].loaiNhanVien = nv.loaiNhanVien;

  // Thông báo sửa thành công
  alert("Cập nhật thành công nhân viên có tài khoản " + nv.taiKhoan);

  //   Tạo lại danh sách
  renderTable(mangNhanVien);

  // Lưu Local sau khi sửa
  setLocalStorage();

  //   Đóng Modal
  $("#myModal").modal("hide");
};

// Tìm kiếm
document.querySelector("#btnTimNV").onclick = function () {
  // Lấy input tìm kiếm từ giao diện
  var xepLoai = document.querySelector("#searchName").value;

  // Tạo mảng các nhân viên cần tìm kiếm
  var arrSearch = [];
  if (xepLoai === "Tất cả") {
    renderTable(mangNhanVien);
  } else if (xepLoai === "Loại nhân viên") {
    alert("Vui lòng chọn loại nhân viên");
    return;
  } else {
    for (var i = 0; i < mangNhanVien.length; i++) {
      if (mangNhanVien[i].loaiNhanVien === xepLoai) {
        arrSearch.push(mangNhanVien[i]);
      }
    }
    if (arrSearch.length <= 0) {
      var html = `
              <tr>
                  <td colspan = "8" class="text-center">Không có nhân viên xếp loại này</td>
              </tr>
      `;
      document.querySelector("#tableDanhSach").innerHTML = html;
    } else {
      renderTable(arrSearch);
    }
  }
};

/**
 * Hiển thị danh sách nhân viên
 * @param {*} arrNhanVien Mảng nhân viên
 */
function renderTable(arrNhanVien) {
  var html = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    // Lấy ra tùng nhân viên trong mảng
    var nv = arrNhanVien[i];

    // Tạo ra chuỗi html
    html += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong.toLocaleString("vi")}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
              <div class="row">
                  <div class="col-6"><button class="btn btn-danger" onclick="xoaNhanVien('${
                    nv.taiKhoan
                  }')">Xóa</button>
                  </div>
                  <div class="col-6"><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${
                    nv.taiKhoan
                  }')">Sửa</button>
                  </div>
              </div>
            </td>
        </tr>
      `;
  }
  document.querySelector("#tableDanhSach").innerHTML = html;
}

function setLocalStorage() {
  // Chuyển mảng thành chuỗi
  var strMangNV = JSON.stringify(mangNhanVien);
  // Lưu vào local
  localStorage.setItem("mangNhanVien", strMangNV);
}
function getLocalStorage() {
  // Check dữ liệu trong storage
  if (localStorage.getItem("mangNhanVien")) {
    // Lấy dữ liệu từ local
    var strMangNV = localStorage.getItem("mangNhanVien");
    // Chuyển chuỗi về lại thành mảng
    mangNhanVien = JSON.parse(strMangNV);

    // Hiển thị danh sách
    renderTable(mangNhanVien);
  }
}

// lấy Local khi vừa load
window.onload = function () {
  getLocalStorage();
  console.log(mangNhanVien);
};
