# File Management

## Connect database and config
1. Install [mysql](https://www.mysql.com/downloads/) or [xampp](https://www.apachefriends.org/download.html) to connect db
2. Open mysql (xampp), create database file_management (or whatever name you like)
3. Import table into db file_management.sql `/src/repositories/file_management.sql`
4. Config host, user, password, db name at: `/.env`

## Run project
    node index.js
or `npm start` (Dev mode)

## Functions completed
- Register, login: save data into db (mysql2), hash password (bcrypt), cookie, session, validate data (express-validator), flash message...
- Express routers, rate limit
- Files management: CRUD files, folders, upload files (ajax), donwload file, folder (zip format)...

## MỤC TIÊU BÀI THỰC HÀNH
1. Sử dụng cookie và session trong Express để hiện thực chức năng đăng nhập.
2. Sử dụng express static để phục vụ các tập tin tĩnh trên server.
3. Sử dụng fs để đọc và ghi tập tin trên server.
4. Tìm hiểu cơ chế trả về tập tin trực tiếp từ HTTP Response, sử dụng các header như Content-Type, Content-Disposition. Cách giới hạn tốc độ download tập tin bằng HTTP.
5. Kết nối và tương tác với cơ sở dữ liệu MySQL sử dụng mysql hoặc promise-mysql.
6. Sử dụng bcrypt để hash mật khẩu người dùng.
7. Sử dụng cross site request forgery token để phòng chống tấn công csrf.
8. Sử dụng ajax/fetch kết hợp với rest api phía server để thực hiện các tính năng cần đọc/thay đổi dữ liệu từ server mà không cần tải lại trang web.

## ĐỀ BÀI
Sử dụng ExpressJS và các module cần thiết để phát triển trang web quản lý tập tin. Trang web cần có các tính năng như: đăng ký tài khoản, đăng nhập và quản lý tập tin/thư mục.
- Đăng ký tài khoản: Các thông tin cần được cung cấp bao gồm tên người dùng, địa chỉ emai  và mật khẩu. Những thông tin này cần được lưu vào cơ sở dữ liệu MySQL. Mật khẩu cần được hash bằng các giải thuật chẳng hạn như bcrypt trước khi lưu vào database. Hai form đăng ký/đăng nhập cần phải sử dụng csrf token để phòng chống tấn công cross site request forgery.
- Đăng nhập: Sử dụng tài khoản đã đăng ký trước đó để đăng nhập. Nếu chưa đăng nhập mà người dùng truy cập vào trang chủ thì sẽ được chuyển hướng tự động đến trang đăng nhập. Nếu đã đăng nhập rồi mà người dùng cố tình truy vập vào trang đăng nhập/đăng ký thì sẽ được chuyển hướng tự động về trang chủ.
- Trang chủ: Trang chủ hiện thị giao diện để người dùng quản lý tập tin và thư mục,
trang này cung cấp các chức năng như:
  - Liệt kê danh sách tập tin và thư mục: Sắp xếp thư mục ở trước, tập tin sau.
Hiển thị các thông tin phụ như icon, loại tập tin, kích thước, ngày cập nhật…
  - Xem tập tin: Khi click vào một tập tin thì trình duyệt sẽ mở tập tin hoặc tải tập tin về (sử dụng express static để thực hiện tính năng này).
  - Upload một tập tin mới: sử dụng ajax/fetch để upload tập tin và hiển thị thanh tiến trình trong quá trình upload. Chỉ cần upload một tập tin vào một thời điểm.
  - Tạo thư mục mới, đổi tên tập tin/thư mục, xóa tập tin/thư mục: Cần hiển thị confirm dialog phù hợp trước khi xóa/thay đổi dữ liệu
  - Tìm kiếm tập tin và thư mục: ngay khi gõ từ khóa cần tìm thì kết quả sẽ được lọc ra, chỉ hiển thị kết quả phù hợp trong danh sách tập tin.
  - Tải tập tin/thư mục: Khi click vào download icon kế bên mỗi tập tin/thư mục thì trang web sẽ tải xuống tập tin/thư mục đó (mà không cần chuyển trang). Nếu là thư mục, trang web sẽ tải về tập tin nén dạng zip của thư mục. Sau khi đã tải về thành công, tập tin zip của thư mục sẽ được xóa tự động trên server (sử dụng các header như Content-Type, Content-Disposition để hiện thực tính năng này). Ngoài ra, có thể áp dụng giới hạn tốc độ download tập tin.
  - Di chuyển giữa các thư mục: Khi click vào một thư mục bất kỳ thì các tập tin và thư mục con bên trong của thư mục đó sẽ được hiển thị. Ngoài ra, khi đang ở một thư mục bất kỳ thì luôn có thể di chuyển nhanh chóng đến thư mục gốc hoặc một trong các thư mục cha của thư mục hiện đó (thông qua Bootstrap Breadcrumb).

## Các yêu cầu khác
- Ở góc độ mã nguồn: Sử dụng Express Router để tạo các route riêng cho hai tính năng:
quản lý tài khoản và quản lý tập tin (ví dụ AccountRouter và FileRouter).
- Các chức năng trong giao diện quản lý file (trang chủ) phải được thực hiện bằng
ajax/fetch để không cần phải tải lại trang web.
- Nếu người dùng truy cập vào bất cứ path nào khác với những path mô tả ở trên thì
chuyển hướng đến đường dẫn /error và hiển thị giao diện thông báo lỗi 404 not found.
- Tiếp tục sử dụng các module trong các bài thực hành trước để áp dụng vào bài tập
này. Chẳng hạn sử dụng:
  - Sử dụng session và cookie để ghi nhớ thông tin đăng nhập.
  - Sử dụng express-form, express-validator để kiểm tra dữ liệu từ HTML form.
  - Sử dụng multer để xử lý upload tập tin.
  - Sử dụng flash messsage để gửi thông báo thông báo giữa các routes.
  - Sử dụng tính năng rate limit trong express để phòng chống tấn công DDOS.