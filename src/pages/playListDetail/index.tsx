import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getPlayListDetailApi } from '../../api'

import './index.scss'

class Page extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { id, name } = getCurrentInstance().router?.params
    Taro.setNavigationBarTitle({
      title: name
    })

    this.getPlayListDetail(id)
  }

  async getPlayListDetail (id) {
    try {
      let res = await getPlayListDetailApi(id)
      console.log('res', res)
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <View>
        详情页
      </View>
    )
  }
}

export default Page