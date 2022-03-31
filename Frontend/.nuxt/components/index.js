export { default as ContributorView } from '../..\\components\\ContributorView.vue'
export { default as DownloadImage } from '../..\\components\\DownloadImage.vue'
export { default as HomePage } from '../..\\components\\HomePage.vue'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as NormalUserView } from '../..\\components\\NormalUserView.vue'
export { default as Pagination } from '../..\\components\\Pagination.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
