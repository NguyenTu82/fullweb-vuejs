export default {
    data() {
        return {
            extraShow: false,
            img: ""
        }
    },
    props: {
        data: {
            type: Array
        },
        failed: {
            type:Boolean
        },
        url:{
            type:String
        }
    },
    methods: {
        jumpUrl(){
            window.location.href = this.url;
        }
    },
    watch: {
        extraShow: {
            handler(val) {
                if (val) {
                    this.img = "/assets/images/triangle_s_top.png"
                } else {
                    this.img = "/assets/images/triangle_s.png"
                }
            },
            immediate: true
        }
    }
}
