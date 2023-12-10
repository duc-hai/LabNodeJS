# Lab 4

## Bài 1. Bài tập về consume rest api trong nodejs
Hãy sử dụng nodejs và các module express, ejs, http để tạo một trang web hiển thị danh sách user (giao diện tương tự các bài trước), khi click vào một user nào đó thì sẽ chuyển sang trang hiển thị thông tin chi tiết của user đó. Đồng thời, trang web cũng cung cấp tính năng để thêm một user mới, cập nhật thông tin user và xóa user. Nếu có thể, hãy hiển thị confirm dialog để xác nhận trước khi cập nhật dữ liệu.
Trang web không cần trực tiếp quản lý việc lưu trữ dữ liệu mà sẽ fetch dữ liệu từ một rest api, ví dụ gorest.co.cin. https://gorest.co.in/ là một dịch vụ cung cấp rest api phục vụ cho mục đích kiểm thử. Một số ví dụ về API mà gorest.co.in cung cấp:
- GET /public-api/users: đọc danh sách user
- POST /public-api/users: thêm một user mới
- GET /public-api/users/{id}: đọc thông tin chi tiết của một user
- PUT /public-api/users/{id}: cập nhật thông tin cho một user
- DELETE /public-api/users/{id}: xóa một user

### Hướng dẫn làm bài
- GET /public-api/users: trả về danh sách user (20 user đầu tiên).
- GET /public-api/users?page=2: lấy các user từ 21 đến 40.
- POST /public-api/users: Thêm một user mới, trong đó dữ liệu body cần được gửi đi với định dạng json: {"name":"Nguyen Van A", "gender":"Nam", "email":"nguyenvana@gmail.com", "status":"Active"}. Ngoài ra request cần cung cấp thêm một header ‘Authorization’ mang giá trị 'Bearer <Access Token>'. Cần phải đăng nhập tại https://gorest.co.in/access-token để lấy access token.