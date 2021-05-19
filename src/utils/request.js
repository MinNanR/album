const baseUrl = "http://192.168.43.106:8101/"
    // const baseUrl = "https://minnan.site:2002/rental"
import localstorage from './localstorage.js'

const request = {
    post: function(url, param) {
        let header = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        let token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyZWFsTmFtZSI6IuawkemaviIsInN1YiI6Im1pbiIsInN0YW1wIjoiZGE3NWE4ZTUyY2UwNGNjZWIzMTdhODVkMTVkNjUyZGIiLCJpZCI6MSwiZXhwIjoxNjIyMDQ1NTY5LCJpYXQiOjE2MjE0NDA3Njl9.lPifFb3DxorHLHzGTGh863sqhqAAS6vCHoTv_wQqTsENGy3thInGYg2Lbuv8uGD8fD0EUp7jHRQWKngoYn9rUQ'
        if (token !== null && token !== '') {
            header.Authorization = token
        }
        return new Promise((resolve, reject) => {
            uni.request({
                url: `${baseUrl}${url}`,
                method: "POST",
                header: header,
                timeout: 20000,
                data: param,
                success: (response) => {
                    if (response.statusCode === 200) {
                        if (response.header.newToken != null && response.header.newToken != '') {
                            localstorage.setStorageExpire(
                                "token",
                                `Bearer ${response.header.newToken}`,
                                7 * 24 * 60 * 60 * 1000
                            )
                        }
                        let data = response.data
                        if (data.code === '000') {
                            resolve(data)
                        } else {
                            return reject(data.message)
                        }
                    } else if (response.statusCode === 401) {
                        localstorage.removeStorage("token")
                        uni.showModal({
                            showCancel: false,
                            title: "身份校验失败",
                            content: response.data.message | '登录信息缺失',
                            confirmText: "确定",
                            success: (res) => {
                                if (res.confirm) {
                                    uni.reLaunch({ url: "/pages/login/login" })
                                }
                            }
                        })
                    } else {
                        return reject(response)
                    }
                },
                fail: (err, code) => {
                    return reject(err)
                },
                complete: (res) => {
                    if (res.statusCode === 401) {
                        const pages = getCurrentPages()
                        if (pages[pages.length - 1].route !== 'pages/login/login') {
                            uni.reLaunch({ url: "/pages/login/login" })
                        }
                    }
                }
            })
        })
    },

    get: function(url, param) {
        return new Promise(resolve => {
            uni.request({
                url: `${baseUrl}${url}`,
                method: "GET",
                timeout: 5000,
                data: param,
                success: (response) => {
                    if (response.statusCode === 200) {
                        let data = response.data
                        if (data.code === '000') {
                            resolve(data)
                        } else {
                            return Promise.reject(data.message)
                        }
                    } else {
                        return Promise.reject()
                    }
                },
                fail: (err) => {
                    return Promise.reject(err)
                }
            })
        })
    },
}

export default request