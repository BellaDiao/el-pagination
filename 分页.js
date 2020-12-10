var apiManager = 'http://106.15.232.4:9080'
var $this;
var columnsData = columnData()
var dataSearch = detaSearchs()
var qs = Qs
 var vm = new Vue({
    el: '#app',
    data() {
        return {
            pageSize: 100,
            dataSearch: dataSearch,
            pageLength: 1,
            selectChooseArr: [], //
            currDate: '10',
            demandNo: '',
            columns: columnsData,
            tabledata: [],
            curly: '全领域', // 当前选择的领域，默认全领域
            search: '',
        }
    },
    mounted() {
        this.$nextTick(() => {
            $this = this;
            var datass = $this.dataSearch
            datass.pageNum = 1
            datass = $this.dataCommon(datass)
            if (datass.applicationField) {
                if (datass.applicationField == '全领域') {
                    datass.applicationField = ''
                }
            }
            $.ajax({ //初始化，获取报表
                type: "post",
                url: apiManager + "/wzkb/list", // 报表的url
                data: qs.stringify({}),
                contentType: "application/x-www-form-urlencoded",
                contentlength: 100,
                dataType: "json",
                success: function (res) {
                    var tabledata = res.data.dataList;
                    $this.pageLength = res.data.total
                    $this.tabledata = tabledata; // 传数据
                    $this.tableReset()
                },
            });
        })
    },
    methods: {
        changePage(currentPage) {
            var datass = $this.dataSearch;
            console.log("datass的changpage:" + JSON.stringify(datass));
            datass.pageNum = currentPage
            datass = $this.dataCommon(datass)
            if (datass.applicationField) {
                if (datass.applicationField == '全领域') {
                    datass.applicationField = ''
                }
            }
            this.baobiao(qs.stringify(datass))
        },
        tableReset() {
            $('#docDateTable').bootstrapTable('destroy').bootstrapTable({
                 clickToSelect: true, //是否启用点击选中行
                showColumns: true, //是否显示所有的列
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, //是否显示分页（*）
                pageNumber: 1, //初始化加载第一页，默认第一页
                pageSize: $this.pageSize, //每页的记录行数（*）
                pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
                columns: $this.columns,
                data: $this.tabledata,
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                showJumpTo: true,
                onColumnSwitch: function (field, checked) { // 每选择一次列，就触发这个方法
                    // 目的：获取有没有选中这一列，并返给后台保存，下次登陆或刷新，返回配置的列
                    $this.columns.forEach(item => {
                        if (item.field === field) { 
                            item.visible = checked;
                        }
                    });
                },
            });
        },

        // 处理分页数据量
        pageSizeChange(val) {
            this.pageSize = val;
            var dataSearch = detaSearchs();
            dataSearch.pageSize = this.pageSize;
            var datass = JSON.parse(JSON.stringify(dataSearch));
            this.baobiao(qs.stringify(datass));
        },
        baobiao(data) {
            $.ajax({
                type: "post",
                async: false, //异步请求
                url: apiManager + "/wzkb/list", // 报表的url
                data: data,
                contentType: "application/x-www-form-urlencoded",
                contentlength: 100,
                dataType: "json", //返回数据形式为json,
                success: function (res) {
                    var tabledata = res.data.dataList;
                    $this.pageLength = res.data.total
                    $this.tabledata = tabledata; // 传数据
                    $this.tableReset()
                },
            });
        },
        dataCommon(datass) {
            if (this.sn) {//当前状态
                datass.sn = this.sn
            }
            if (this.manufacturer) {//当前选择的生产厂家
                datass.manufacturer = this.manufacturer
            }
            for (var m = 0; m < this.selectChooseArr.length; m++) {
                if (this.selectChooseArr[m].name == "申购日期") {
                    datass.twzsg = this.selectChooseArr[m].value
                }
                if (this.selectChooseArr[m].name == "到货单状态") {
                    datass.arrivedArrived = this.selectChooseArr[m].value
                }
            }
            return datass
        },
    }

});