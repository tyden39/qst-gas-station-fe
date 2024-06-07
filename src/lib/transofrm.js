export const transformToSelectList = (data) => {
  return data.map((item, index) => ({id: index, value: item.id, label: item.name}))
}