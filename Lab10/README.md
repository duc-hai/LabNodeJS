# Lab 10

## MỤC TIÊU BÀI THỰC HÀNH:
1. Ôn tập lại tất cả các kiến thức đã học.
2. Tích hợp đăng nhập bằng Google vào trang web.
3. Tìm hiểu về web socket và socket io.
4. Triển khai trang web lên dịch vụ hosting.

## MÔ TẢ ĐỀ BÀI
Xây dựng trang web chat trực tuyến bằng cách sử dụng giao thức Web Socket. Trang web cho phép người dùng gửi tin nhắn và gửi tập tin theo thời gian thực. Để sử dụng chức năng chat, trước hết người dùng cần đăng nhập vào trang web bằng cách sử dụng tài khoản email sinh viên. Sau khi hoàn tất quá trình phát triển, trang web cần được triển khai lên một dịch vụ hosting cụ thể, ví dụ Heroku.

*Giao diện đăng nhập có hỗ trợ tính năng ‘Đăng nhập với Google’. Trong bài tập này chúng ta không hiện thực tính năng đăng nhập bằng username, password truyền thống mà chỉ sử dụng tính năng đăng nhập với Google. Tuy nhiên để tăng tính thẩm mỹ thì trang đăng nhập vẫn hiển thị giao diện đầy đủ.*

## MÔ TẢ YÊU CẦU
1. Triển khai ứng dụng lên hosting
Để dễ dàng thực hiện chức năng ‘Đăng nhập với Google’ thì trang web nên được triển khai lên một dịch vụ hosting cụ thể để trang web có thể được truy cập từ mọi nơi và có một tên miền xác định. Có thể sử dụng các dịch vụ miễn phí chẳng hạn như Heroku.
2. Chức năng đăng nhập bằng Google
Người dùng cần đăng nhập bằng tài khoản email sinh viên trước khi có thể truy cập vào trang web. Chỉ các tài khoản @student.tdtu.edu.vn mới có thể đăng nhập vào trang web.
3. Chức năng quản lý danh sách các cuộc trò chuyện
Sau khi đăng nhập vào trang web, người dùng được chuyển hướng đến trang chủ, nơi mà danh sách những người dùng đang trực tuyến được hiển thị. Danh sách này sẽ được cập nhật theo thời gian thực, khi vừa mới đăng nhập hoặc khi thoát khỏi cuộc trò chuyện thì người dùng có trạng thái ‘đang rảnh’. Nếu một người dùng bắt đầu vào một cuộc trò chuyện thì trạng thái của họ sẽ chuyển thành ‘đang bận’. Nếu người dùng đăng xuất hoặc đóng trình duyệt thì họ sẽ được xóa ra khỏi danh sách của các người dùng khác ngay lập tức.
4. Chức năng gửi tin nhắn
Để cho đơn giản, chỉ cần thực hiện chức năng chat với một người dùng vào một thời điểm. Khi một người dùng đang bận, chúng ta không thể chat với họ cho đến khi họ kết thúc phiên trò chuyện hiện tại. Giao diện trò chuyện hỗ trợ gửi tin nhắn văn bản và gửi hình ảnh (thông qua kéo thả vào cửa sổ trò chuyện)

## YÊU CẦU NÂNG CAO
Sử dụng MongoDB để lưu trữ lịch sử trò chuyện.