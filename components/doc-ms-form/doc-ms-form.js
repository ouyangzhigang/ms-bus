import avalon from 'avalon2';

import ajax from '../../services/ajaxService';
import { serviceUrl } from "../../services/configService";
import { createForm, message } from "ane";

export const name = 'doc-ms-form';

avalon.component(name, {
    template: __inline('./doc-ms-form.html'),
    defaults: {
        $form: createForm({
            record: initialData()
        }),
        record: initialData(),
        json: '',
        expire: 0,
        regionData: [
            {key: 1, title: "重庆", children: []},
            {key: 2, title: "四川", children: [
                {key: 4, title: '成都', children: []},
                {key: 5, title: '绵阳', children: []},
                {key: 6, title: '攀枝花', children: []}
            ]},
            {key: 3, title: "浙江", children: [
                {key: 7, title: '杭州', children: []},
                {key: 8, title: '温州', children: []}
            ]}
        ],
        fileUploadUrl: serviceUrl + '/api/file/uploadFile',
        addEducation() {
            this.record.education.push('');
        },
        removeEducation(school) {
            this.record.education.remove(school);
        },
        handleBeforeUpload(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                message.error({
                    content: '只能选择jpg或者png类型的图片！'
                });
                return false;
            }
            if (file.size / 1024 / 1024 > 1) {
                message.error({
                    content: '选择的图片必须小于1MB！'
                });
                return false;
            }
            return true;
        },
        handleChange(e) {
            console.log(e.target.value);
        },
        submit() {
            // if (!avalon.vmodels['doc_form'].validate()) {
            //     return false;
            // }
            this.$form.validateFields();
        },
        onInit(event) {
            this.$form.onFieldsChange = (fields, record) => {
                this.json = JSON.stringify(record, null, 2);
            }
            this.$watch('expire', v => {
                console.log(v);
            })
        }
    }
});

function initialData() {
    return {
        name: '123',
        gender: 'F',
        masterpiece: ['ms-bus'],
        location: 4,
        birthday: '2017/03/25',
        bankai: '2017-10-10 12:12:12',
        hobby: ['code'],
        avatar: '',
        education: ['常乐男子职业技术学院'],
        bio: '',
        attachment: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
    };
}