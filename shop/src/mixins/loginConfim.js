export default {
  methods: {
    loginConfim () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({ title: '温馨提示', message: '需要登录才能继续', confirmButtonText: '去登录', cancelButtonText: '再逛逛' }).then(() => {
          this.$router.replace(
            {
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
        }).catch(() => { })
        return true
      }
      return false
    }
  }
}
