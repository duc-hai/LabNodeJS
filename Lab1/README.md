# Lab1

## Ex1. Bài tập về Ajax (XMLHttpRequest) và Document Object Model (DOM)
Thực hiện các yêu cầu sau:
1. Nhập địa chỉ URL của một tập tin ảnh
2. Khi nhấn nút ‘Tải ảnh’ thì sử dụng Ajax để tải tập tin ảnh về dưới dạng blob.
3. Tạo một HTMLImageElement object (thẻ img) và hiển thị ảnh vừa tải về trên trang web (sử dụng URL.createObjectURL(blob)).
4. Khi nhấn nút “Tải ảnh” trong các lần tiếp theo, vì thẻ img đã được tạo nên lúc này chỉ cần thay thế thuộc tính src bằng giá trị blob mới là được.

## Ex2. Bài tập về Fetch API và Ajax
Cho dữ liệu chứa danh sách sinh viên được lưu trong tập tin JSON tại liên kết sau: https://maivanmanh.github.io/503106/lab01/students.json. Sử dụng Fetch API và Ajax để tải dữ liệu về sau đó hiển thị trên một bảng HTML.

## Ex3. Bài tập về Promise và Async, Await
Chức năng tải ảnh trong bài tập 1 hiện đang được implement bằng Ajax, hãy điều chỉnh lại source
code để đóng gói (wrap) chức năng này vào một Promise object.
Sau đó, thực thi Promise vừa tạo theo hai cách:
- Cách truyền thống: Promise.then(…).catch(…)
- Cách dùng async và await kết hợp với try/catch.

## Ex4. Bài tập về Local Storage và SessionStorage
Viết một trang web quản lý và lưu trữ dữ liệu sinh viên trong local storage và session storage.
- Trang web cho người dùng nhập vào thông tin cơ bản của sinh viên sau đó hiển thị trên hai bảng tương ứng.
- Ngoài ra dữ liệu khi được thêm cũng sẽ được lưu tự động vào một trong hai loại storage tương ứng.
- Khi tải lại trang (hoặc mở tab mới), nếu có dữ liệu đã được lưu trong các storage trước đó thì chúng sẽ được nạp và hiển thị trên bảng tương ứng