# Lab 2

## Bài 1. Bài tập tạo trang web cơ bản bằng http module trong NodeJS.
Sử dụng http module để tạo một trang web tính toán cơ bản như hình bên dưới. Khi truy cập http://localhost/ thì trang web sẽ hiển thị một html form như hình bên dưới. Khi nhấn nút "Tính", kết quả sẽ được hiển thị tại http://localhost/result.

Yêu cầu:
- Toàn bộ chương trình chỉ được viết trong một tập tin main.js duy nhất.
- Kiểm tra lỗi nếu có và hiển thị thông báo lỗi phù hợp.

## Bài 2. Bài tập xử lý POST request bằng http module
Thực hiện một bài tập khác tương tự như bài tập 1.
- http://localhost: hiển thị một form đăng nhập, form này tiếp nhận hai thông tin là email và mật khẩu rồi chuyển đến /login bằng phương thức POST.
- http://localhost/login: tiếp nhận thông tin đăng nhập được gửi đến bằng POST và xử lý việc đăng nhập, hiển thị thông báo lỗi nếu có. Khi đăng nhập thành công thì hiển thị thông tin ‘đăng nhập thành công’.

## Bài 3. Sử dụng NodeJS để tạo một Rest API cung cấp thông tin cơ bản về sinh viên như sau.
- http://localhost/students:
  - Phương thức GET: Trả về danh sách sinh viên dạng JSON Array.
  - Phương thức POST: Thêm một sinh viên mới
- http://localhost/students/{id}:
  - Phương thức GET: Trả về thông tin của một sinh viên cụ thể
  - Phương thức PUT: Cập nhật thông tin mới cho sinh viên
  - Phương thức DELETE: Xóa sinh viên
- Truy cập các endpoints khác: trả về thông báo lỗi dạng JSON.
Lưu ý:
- Dữ liệu mẫu do sinh viên tự tạo.
- Chỉ cần tạo API, sau đó sử dụng các Rest client để kiểm tra API.