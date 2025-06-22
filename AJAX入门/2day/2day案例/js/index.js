/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
// 封装-获取并渲染图书列表函数
const creator = '小凯'
function getboksList() {
  // 获取数据
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      // 外号获取对应的数据
      creator
    }
  }).then(res => {
    // console.log(res);
    const bookList = res.data.data
    console.log(bookList);
    const htmlStr = bookList.map((item, index) => {
      return `
          <tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
          <tr/>
      `
    }).join('')
    document.querySelector('.list').innerHTML = htmlStr;

  })
}
getboksList();

/**
 * 目标2：新增图书
 *  2.1 新增弹框->显示和隐藏
 *  2.2 收集表单数据，并提交到服务器保存
 *  2.3 刷新图书列表
 */
// 2.1 创建弹框对象

const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
// 保存按钮，点击隐藏弹框
document.querySelector('.add-btn').addEventListener('click', () => {
  // 2.2 收集表单数据，并提交到服务器保存
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  console.log(bookObj);
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'post',
    data: {
      ...bookObj,
      creator
    }
  }).then(res => {
    // console.log(res);
    // 2.3 添加成功后刷新列表
    getboksList();
    // 重置表单
    addForm.reset()
    addModal.hide()

  })



})
