<template>
  <van-popup v-model="shareShow" round position="bottom" :z-index="99999">
    <div class="app-list safe-area-inset-bottom">
      <div class="item whatsapp" @click="forward('whatsapp')">
        <van-icon class-prefix="icon" name="whatsapp" size="60px" color="#fff" />
      </div>
      <div class="item in" @click="forward('in')">
        <van-icon class-prefix="icon" name="in" size="60px" color="#3b589c" />
      </div>
      <div class="item facebook" @click="forward('facebook')">
        <van-icon class-prefix="icon" name="tian7_facebook" size="60px" color="#007bb6" />
      </div>
      <div class="item weixin" @click="forward('weixin')">
        <van-icon class-prefix="icon" name="weixin" size="60px" color="#05af10" />
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default() {
        return "";
      },
      required: true
    }
  },
  data() {
    return {
      shareShow: false
    };
  },
  methods: {
    show() {
      this.shareShow = true;
    },
    hide() {
      this.shareShow = false;
    },
    forward(type) {
      var urlMeta = document.createElement("meta");
      urlMeta.property = "og:url";
      urlMeta.content = "分享FBurl";

      var titleMeta = document.createElement("meta");
      titleMeta.property = "og:title";
      titleMeta.content = "分享FBtitle";

      var typeMeta = document.createElement("meta");
      typeMeta.property = "og:type";
      typeMeta.content = "分享FBtype";

      var descriptionMeta = document.createElement("meta");
      descriptionMeta.property = "og:description";
      descriptionMeta.content = "分享FBdescription";

      var imageMeta = document.createElement("meta");
      imageMeta.property = "og:image";
      imageMeta.content = "分享FBimage";
      document.getElementsByTagName("head")[0].appendChild(urlMeta);
      document.getElementsByTagName("head")[0].appendChild(titleMeta);
      document.getElementsByTagName("head")[0].appendChild(typeMeta);
      document.getElementsByTagName("head")[0].appendChild(descriptionMeta);
      document.getElementsByTagName("head")[0].appendChild(imageMeta);
      var url = "http://www.baidu.com"
      var content = "";
      content +=
        "Aap hamare Facebook page ko like karein jisse application k bahar hone wale events me bhi Participate kar k kama saktein hain paise.";
      content += "\n" + url + "\n";

      if (type == "whatsapp") {
        location = "whatsapp://send?text=" + encodeURIComponent(content);
      } else if (type == "facebook") {
        (location =
          "http://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(content) +
          "&t=" +
          encodeURIComponent(url)),
          "sharer",
          "toolbar=0,status=0,width=626,height=436";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 30px;
  .whatsapp {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #0ead08;
  }
}
</style>