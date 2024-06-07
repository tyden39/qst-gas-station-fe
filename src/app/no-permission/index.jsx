export default function NoPermission() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-gray-500 text-xl">
      <img src="/images/warning.png" alt="warning" width={300} />
      <p>Rất tiếc, bạn không có quyền truy cập vào trang này.</p>
      <p>Vui lòng liên hệ Quản trị viên để biết thêm chi tiết.</p>
    </div>
  )
}