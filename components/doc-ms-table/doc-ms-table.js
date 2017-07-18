import avalon from 'avalon2';
import * as bootbox from 'bootbox';

import ajax from '../../services/ajaxService';
import { message } from "ane";

export const name = 'doc-ms-table';

avalon.component(name, {
    template: __inline('./doc-ms-table.html'),
    defaults: {
        list: avalon.range(29).map(n => ({
            id: n, name: `老狼${n}`, address: '深山', province: '老林'
        })),
        remoteList: [],
        loading: false,
        pagination: {
            pageSize: 6, total: 0
        },
        fetch(params = {}) {
            this.loading = true;
            ajax({
                url: '/api/demo',
                method: 'get',
                data: {
                    ...params
                }
            }).then(data => {
                this.pagination.total = data.total;
                data.list[0].region_parent_id = Date.now();
                this.remoteList = data.list;
                this.loading = false;
            });
        },
        handleTableChange(pagination) {
            if (this.pagination.hasOwnProperty('current')) {
                this.pagination.current = pagination.current;
            }
            this.fetch({
                start: pagination.pageSize * (pagination.current - 1),
                limit: pagination.pageSize
            });
        },
        actions(type, text, record, index) {
            if (type == 'delete') {
                this.list.removeAll(el => el.id == record.id );
                message.success({
                    content: '删除成功'
                });
            }
        },
        handleSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
        },
        handleSelectAll(selected, selectedRows) {
            console.log(selected, selectedRows);
        },
        handleSelectionChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        handleChange(e) {

        },
        onInit(event) {
            this.fetch();
        }
    }
});