import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import { AtSearchBar, AtTabBar } from 'taro-ui'
import api from '../../services/api'
import { getRecommendPlayListApi } from '../../api'
import classnames from 'classnames'
import './index.scss'
interface PageState {
  current: number
  searchValue: string
  bannerList: Array<{
    typeTitle: string
    pic: string
    targetId: number
  }>
  recommendPlayList: Array<{
    id: number
    name: string
    picUrl: string
    playCount: number
  }>
}

export default class Index extends Component<any, PageState> {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      searchValue: '',
      bannerList: [],
      recommendPlayList: []
    }
  }

  componentDidMount () {
    this.getBanner()
    this.getRecommendPlayList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goSearch () {
    console.log('click goSearch')
  }

  async getBanner () {
    try {
      let res = await api.get('/banner', {
        type: 2
      })
      const { data } = res
      if (data.banners) {
        this.setState({
          bannerList: data.banners
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getRecommendPlayList () {
    try {
      let res = await getRecommendPlayListApi()
      const recommendPlayList = res.data.result
      this.setState({
        recommendPlayList
      })
    } catch (err) {
      console.log(err)
    }
  }

  goDetail (item) {
    console.log('item', item)
    Taro.navigateTo({
      url: `/pages/playListDetail/index?id=${item.id}&name=${item.name}`
    })
  }

  switchTab (value) {
    if (value !== 1) return
    Taro.reLaunch({
      url: '/pages/my/index'
    })
  }

  render () {
    const { searchValue, bannerList, recommendPlayList } = this.state

    return (
      <View className={classnames({
        index_container: true,
        hasMusicBox: false
      })}>
        <View onClick={this.goSearch.bind(this)}>
          <AtSearchBar 
            actionName="搜一下"
            value={searchValue}
            onChange={this.goSearch.bind(this)}
          />
        </View>
        <Swiper
          className="banner_list"
          indicatorColor="#999"
          indicatorActiveColor="#d43c33"
          circular
          indicatorDots
          autoplay
        >
          {bannerList.map(item => (
            <SwiperItem key={item.targetId} className="banner_list_item">
              <Image src={item.pic} className="banner_list__item__img"/>
            </SwiperItem>
          ))}
        </Swiper>
        <View className="handle_list"></View>
        <View className="recommend_playlist">
            <View className="recommend_playlist__title">推荐歌单</View>
            <View className="recommend_playlist__content">
              {recommendPlayList.map((item) => (
                <View
                  key={item.id}
                  className="recommend_playlist__item"
                  onClick={this.goDetail.bind(this, item)}
                >
                  <Image 
                    src={`${item.picUrl}?imageView&thumbnail=250x0`}
                    className="recommend_playlist__item__cover"
                  />
                  <View className="recommend_playlist__item__cover__num">
                    <Text className="at-icon at-icon-sound"></Text>
                    {item.playCount < 10000 ? item.playCount : `${Number(item.playCount / 10000).toFixed(0)}万`}
                  </View>
                  <View className="recommend_playlist__item__title">
                    {item.name}
                  </View>
                </View>
              ))}
            </View>
          </View>
          <AtTabBar 
            fixed
            selectedColor="#d43c33"
            tabList={[
              {title: '发现', iconPrefixClass: "fa", iconType: "feedd"},
              {title: '我的', iconPrefixClass: 'fa', iconType: 'music'}
            ]}
            onClick={this.switchTab.bind(this)}
            current={this.state.current}
          />
      </View>
    )
  }
}
