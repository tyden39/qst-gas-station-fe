export const transformToSelectList = (data, valueFieldName = 'id', labelFieldName = 'name') => {
  return data.map((item, index) => ({id: index, value: item[valueFieldName], label: item[labelFieldName]}))
}