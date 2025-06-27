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
    // console.log(bookList);
    const htmlStr = bookList.map((item, index) => {
      return `
          <tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td data-id=${item.id}>
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
  // console.log(bookObj);
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
/**
 * 目标3：删除图书
 *  3.1 删除元素绑定点击事件->获取图书id
 *  3.2 调用删除接口
 *  3.3 刷新图书列表
 */
// 3.1 删除元素 -》点击（事件委托）
document.querySelector('.list').addEventListener('click', (e) => {
  // console.log(e.target);
  // 判断点击的是不是删除按钮
  if (e.target.classList.contains('del')) {
    // 获取图书ID（自定义属性）
    const theId = e.target.parentNode.dataset.id
    // console.log(theId);
    // 3.2 调用删除接口
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,
      method: 'DELETE',
    }).then(() => {
      getboksList()
    })

  }


})


/**
 * 目标4：编辑图书
 *  4.1 编辑弹框->显示和隐藏
 *  4.2 获取当前编辑图书数据->回显到编辑表单中
 *  4.3 提交保存修改，并刷新列表
 */
// 4.1 编辑弹框->显示和隐藏
const ediDom = document.querySelector('.edit-modal')
const eidModal = new bootstrap.Modal(ediDom)
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    // 4.2 获取当前编辑图书数据->回显到编辑表单中
    const theId = e.target.parentNode.dataset.id
    // console.log(theId);
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,
    }).then(res => {
      // console.log(res);
      const bookObj = res.data.data
      // document.querySelector('.edit-form .bookname').value = bookObj.bookname
      // document.querySelector('.edit-form .author').value = bookObj.author
      // document.querySelector('.edit-form .publisher').value = bookObj.publisher
      // 数据对象的属性和标签类名一致
      // 遍历数据对象，使用属性去获取对应的标签快速的赋值
      const keys = Object.keys(bookObj)
      keys.forEach((key) => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key]
      })
      eidModal.show()

    })



  }
})
// 点击修改按钮-》隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', () => {
  // 提交保存修改，并刷新列表
  const editForm = document.querySelector('.edit-form')
  const [id, author, booname, publisher] = serialize(editForm, { hash: true, empty: true })
  console.log(editFormList);

  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',
    data: {
      bookname,
      authorr,
      publisher,
      creator
    }
  }).then(res => {
    // console.log(res);
    getboksList();
    eidModal.hide()

  })

})