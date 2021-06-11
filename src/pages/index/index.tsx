import { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import classnames from 'classnames'
import './index.scss'

interface PageState {
  searchValue: string
  bannerList: Array<{
    typeTitle: string
    pic: string
    targetId: number
  }>
}

export default class Index extends Component<any, PageState> {

  constructor (props) {
    super(props)
    this.state = {
      searchValue: '',
      bannerList: []
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goSearch () {
    console.log('click goSearch')
  }

  render () {
    const { searchValue, bannerList } = this.state

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
      </View>
    )
  }
}
