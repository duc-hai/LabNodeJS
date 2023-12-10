# Lab 3

## Xây dựng trang web thực hiện chức năng quản lý sản phẩm cơ bản như sau
- Trang chủ: hiển thị danh sách sản phẩm trên một bảng. Nếu người dùng chưa đăng nhập thì chuyển hướng sang trang đăng nhập.
- Trang đăng nhập (/login):
  - GET: hiển thị giao diện đăng nhập.
  - POST: xử lý đăng nhập và hiển thị lỗi nếu có. Thông tin đăng nhập đọc từ environment variable (tự tạo). Nếu đăng nhập thành công thì chuyển hướng về trang chủ.
- Trang chi tiết sản phẩm (/{id}): hiển thị thông tin chi tiết của một sản phẩm. Một sản phẩm có các thông tin: mã sản phẩm, tên sản phẩm, giá bán, ảnh minh họa, mô tả…
- Trang thêm sản phẩm (/add):
  - GET: hiển thị giao diện để thêm một sản phẩm mới.
  - POST: xử lý thêm sản phẩm và hiển thị lỗi nếu có. Nếu thêm thành công thì chuyển hướng về trang chủ.
- Trang thêm sản phẩm (/edit):
  - GET: hiển thị giao diện để điều chỉnh thông tin sản phẩm.
  - POST: xử lý cập nhật sản phẩm và hiển thị lỗi nếu có. Nếu cập nhật sản phẩm thành công thì chuyển hướng về trang chủ.
- Xóa sản phẩm (/delete):
  - POST: Xóa một sản phẩm dựa trên id sản phẩm được cung cấp và hiển thị lỗi nếu có. Cần hiển thị confirm dialog trước khi xóa.

### Các yêu cầu khác
- Khi thêm, chỉnh sửa hoặc xóa một sản phẩm thành công, trang web chuyển hướng về trang chủ và hiển thị flash message.
- Khi thêm một sản phẩm mới, cần có chức năng upload ảnh minh họa cho sản phẩm.
- Dữ liệu chỉ cần lưu trong bộ nhớ, chưa cần sử dụng các kỹ thuật lưu trữ như file, db.