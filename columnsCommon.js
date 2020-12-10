function columnData() {
    return [ {
        field: 'remindTime',
        title: '时间提醒',
        width: 80,
        visible: true,
        align: 'center',
    }, {
        field: 'workNo',
        title: '工作令',
        width: 80,
        visible: true,
        align: 'center',

    }, {
        field: 'componentName',
        title: '元器件名称',
        width: 80,
        visible: true,
        align: 'center',
    }, {
        field: 'manufacturer',
        title: '生产厂家',
        width: 80,
        visible: true,
        align: 'center',
    }, {
        field: 'qualityLevel',
        title: '质量等级',
        width: 80,
        visible: true,
        align: 'center',
    }, {
        field: 'materialSupervisor',
        title: '物资主管',
        width: 80,
        visible: true,
        align: 'center',
    }]
}

function detaSearchs() {
    return {
        pageNum: 1,
        pageSize: 10,
        sn: undefined,
        applicationField: undefined,
        //等
    }
}
 