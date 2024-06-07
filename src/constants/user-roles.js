export const USER_ROLE = {
  ADMIN: '000',
  COMPANY: '001',
  BRANCH: '002',
  STORE: '003',
  READ_ONLY_STORE: '004',
}

export const USER_ROLES = [
  {id: 0, value: USER_ROLE.ADMIN, label: 'Quản trị viên', description: 'Quản trị viên có toàn quyền trên website.'},
  {id: 1, value: USER_ROLE.COMPANY, label: 'Quản lý công ty', description: 'Quản lý công ty có các quyền tạo người dùng của công ty và các quyền của chi nhánh.'},
  {id: 2, value: USER_ROLE.BRANCH, label: 'Quản lý chi nhánh', description: 'Quản lý công ty có các quyền tạo người dùng của chi nhánh và các quyền của cửa hàng.'},
  {id: 3, value: USER_ROLE.STORE, label: 'Quản lý cửa hàng', description: 'Quản lý cửa hàng có quyền tạo người dùng của cửa hàng, xem và chỉnh sửa hóa đơn.'},
  {id: 4, value: USER_ROLE.READ_ONLY_STORE, label: 'Chỉ xem hóa đơn cửa hàng', description: 'Chỉ xem được thông tin hóa đơn.'},
]