/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
// 1.1 获取用户的数据
const creator = '小凯'
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(res => {
    // console.log(res.data.data);

    const userObj = res.data.data
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            // 赋予默认头像
            document.querySelector('.prew').src = userObj[key]
        } else if (key === 'gender') {
            // 赋予默认性别

            const genderList = document.querySelectorAll('.gender')
            // 0 代表男性，1 代表女性
            genderList[userObj[key]].checked = true
        } else {
            document.querySelector(`.${key}`).value = userObj[key]
        }

    })

})
/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
document.querySelector('#upload').addEventListener('change', (e) => {
    // console.log(e.target.files[0]);
    const fd = new FormData()
    fd.append('avatar', e.target.files[0])
    fd.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fd,
    }).then(res => {
        // console.log(res)
        // const imgUrl = res.data.data.avatar
        document.querySelector('.prew').src = res.data.data.avatar
    })

})
/**
 * 目标3：提交表单
 *  3.1 收集表单信息
 *  3.2 提交到服务器保存
 */
/**
 * 目标4：结果提示
 *  4.1 创建toast对象
 *  4.2 调用show方法->显示提示框
 */

// 保存修改
document.querySelector('.submit').addEventListener('click', () => {
    // 3.1 收集表单信息
    const userFOrm = document.querySelector('.user-form')
    const userObj = serialize(userFOrm, { hash: true, empty: true })


    userObj.creator = creator
    // 性别数字字符串转数字
    userObj.gender = +userObj.gender
    // console.log(userObj);

    // 3.2 提交到服务器保存
    // const { desc, email, gender, nickname } = userObj
    // console.log(desc, email, gender, nickname, creator);

    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: userObj
    }).then(res => {
        // console.log(res);
        // 4.1 创建toast对象
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)
        // 4.2 调用show方法->显示提示框
        toast.show()
    })

})
