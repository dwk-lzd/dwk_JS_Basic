/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
// 1.1 获取用户的数据
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator: '小凯'
    }
}).then(res => {
    console.log(res.data.data);

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