<template>
  <view>
    <view>
      <view class="cu-timeline">
        <view class="cu-item">
          <text
            class="lg text-gray text-bg cuIcon-roundaddfill"
            style="font-size: 60px"
            @click="showAddEventModal"
          ></text>
        </view>
        <view class="cu-item" v-if="addEventModal">
          <form>
            <view class="cu-form-group">
              <view class="title font-szie-17">描述</view>
              <input v-model="description" :focus="inputFocus" />
            </view>
            <view class="cu-form-group">
              <view class="title">日期</view>
              <picker mode="date" @change="DateChange">
                <view class="picker" style="text-align: left; font-size: 16px">
                  {{ dateDisplay }}
                </view>
              </picker>
            </view>
          </form>
          <view class="cu-bar bg-white justify-start">
            <view class="action">
              <button
                class="cu-btn line-green text-green"
                @tap="hideAddEventModal"
              >
                取消
              </button>
              <button class="cu-btn bg-green margin-left" @tap="addEvent()">
                确定
              </button>
            </view>
          </view>
        </view>
        <block v-for="(event, index) in eventList" :key="index">
          <view class="cu-time" style="padding-bottom: 0">{{
            event.time
          }}</view>
          <view class="cu-item" style="padding-top: 5px">
            <view
              class="text-content text-lg text-grey"
              style="font-weight: 600"
              >{{ event.description }}</view
            >
            <view
              class="grid flex-sub col-4 grid-square"
              style="margin-top: 20px"
            >
              <view
                v-for="(image, index) in event.imageList"
                class="bg-img"
                :style="'background-image: url(' + image + ');'"
                :key="index"
              >
              </view>
              <view>
                <text
                  class="lg text-gray text-bg cuIcon-roundadd"
                  style="font-size: 30px"
                  @click="chooseImage(event.id, index)"
                ></text>
              </view>
              <view>
                <text
                  class="lg text-gray text-bg cuIcon-delete"
                  style="font-size: 30px"
                ></text>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>

    <!-- <view class="cu-modal" :class="addEventModal ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">添加事件</view>
          <view class="action" @tap="hideAddEventModal">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view>
          <form>
            <view class="cu-form-group">
              <view class="title font-szie-17">描述</view>
              <input v-model="description" :focus="inputFocus" />
            </view>
            <view class="cu-form-group">
              <view class="title">入住日期</view>
              <picker mode="date" @change="DateChange">
                <view class="picker" style="text-align: left; font-size: 16px">
                  {{ dateString }}
                </view>
              </picker>
            </view>
          </form>
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button
              class="cu-btn line-green text-green"
              @tap="hideAddEventModal"
            >
              取消
            </button>
            <button class="cu-btn bg-green margin-left" @tap="addEvent()">
              确定
            </button>
          </view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      addEventModal: false,
      description: "",
      dateString: dayjs().format("YYYY-MM-DD"),
      dateDisplay: dayjs().format("YYYY年M月D日"),
      eventList: [
        {
          id: 1,
          description: "春节",
          time: "1月31日",
          imageList: [
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
          ],
        },
        {
          id: 2,
          description: "汕头旅行",
          time: "2月13日",
          imageList: [
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
          ],
        },
      ],
      inputFocus: false,
    };
  },
  methods: {
    hideAddEventModal() {
      this.addEventModal = false;
    },
    showAddEventModal() {
      this.addEventModal = true;
      this.inputFocus = true;
    },
    chooseImage(id, index) {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          let tempFile = res.tempFiles[0];
          let token =
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyZWFsTmFtZSI6IuawkemaviIsInN1YiI6Im1pbiIsInN0YW1wIjoiZGE3NWE4ZTUyY2UwNGNjZWIzMTdhODVkMTVkNjUyZGIiLCJpZCI6MSwiZXhwIjoxNjIyMDA1NTA5LCJpYXQiOjE2MjE0MDA3MDl9.CIqSoa2WiHjfTcZk33iHqG7mQVnxmuritRMQ7cMpodU__Rj2lxSesG7CUGPoksVsbFMYpj8ZvnjSF4p5psoDHw";
          uni.uploadFile({
            file: tempFile,
            header: {
              authorization: token,
            },
            formData: {
              id: id,
            },
            name: "image",
            url: "http://192.168.43.106:8101/album/addImage",
            success: (res) => {
              console.log(res.data);
              let data = JSON.parse(res.data);
              let newUrl = data.data;
              this.eventList[index].imageList.push(newUrl);
            },
          });
        },
      });
    },
    DateChange(e) {
      console.log(e.detail.value);
      let value = e.detail.value;
      this.dateDisplay = dayjs(value).format("YYYY年M月D日");
      this.dateString = value;
    },
    getEventList() {
      this.request.post("album/listEvent", {}).then((response) => {
        let data = response.data;
        this.eventList = data;
      });
    },
    addEvent() {
      let form = {
        description: this.description,
        time: this.dateString,
      };
      this.request.post("album/addEvent",form)
      .then(response => {
        let album = response.data
        console.log(album);
        this.addEventModal = false
        this.eventList.unshift(album)
      })
    },
  },
  onShow() {
    this.getEventList()
  },
};
</script>

<style>
.content {
  padding: 0;
}
</style>