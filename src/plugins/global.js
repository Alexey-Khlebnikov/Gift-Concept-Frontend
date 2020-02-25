const $global = {
    convertDate(date_string) {
        var date = new Date(date_string);
        return date.toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit"
        });
    }
}

export default {
    install(Vue) {
        Vue.prototype.$global = $global;

        Vue.mixin({
            // created() {
            //   if (this.handleLoginEvent) {
            //     authService.addListener('loginEvent', this.handleLoginEvent);
            //   }
            // },

            // destroyed() {
            //   if (this.handleLoginEvent) {
            //     authService.removeListener('loginEvent', this.handleLoginEvent);
            //   }
            // }
        });
    }
};