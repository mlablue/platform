<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div
    ref="modelPreview"
    class="model-preview noselect"
    v-if="imgURL"
  >
    <div
      class="model-image-wrapper"
      ref="modelWrapper"
      @mousemove="mouseHolder"
      :style="{
        width: `${viewerWidth}px`,
        height: `${viewerHeight}px`
      }"
    >
      <div
        :style="{ left }"
        class="model-image-holder"
      >
        <img :src="imgURL" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageWidth: 15360,
      imageHeight: 1024,
      viewerWidth: 0,
      viewerHeight: 0,
      imageIndex: 1,
      nbSlices: 15
    }
  },
  props: {
    imgURL: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.viewerWidth = this.viewerHeight = this.$refs.modelPreview.getBoundingClientRect().width
  },
  computed: {
    left () {
      return `-${((this.imageWidth / this.nbSlices) * (this.imageIndex - 1)) * (this.viewerHeight / this.imageHeight)}px`
    }
  },
  methods: {
    mouseHolder ($event) {
      if (!this.$refs.modelWrapper) return

      const rect = this.$refs.modelWrapper.getBoundingClientRect()
      this.imageIndex = Math.min(Math.abs(Math.ceil(this.nbSlices * (1 - (($event.clientX - rect.left) / rect.width)))), this.nbSlices)
    }
  }
}
</script>
