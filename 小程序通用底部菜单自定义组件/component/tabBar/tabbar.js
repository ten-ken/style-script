Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        extClass: {
            type: String,
            value: ''
        },
        list: {
            type: Array,
            value: []
        },
        current: {
            type: Number,
            value: 0
        }
    },
    methods: {
        tabChange: function tabChange(e) {
            var index = e.currentTarget.dataset.index;

            if (index === this.data.current) {
                return;
            }
            this.setData({
                current: index
            });
            this.triggerEvent('change', { index: index, item: this.data.list[index] });
        }
    }
});
