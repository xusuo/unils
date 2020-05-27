import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import editorMultiUpload from '@/components/editor-multi-upload'

/**
 * 实现的百度编辑器插件
 * 主要用来做编辑器内置图片上传处理
 * */
// console.log('UE',UE)
UE.registerUI('dialog', function (editor, uiName) {

    //参考addCustomizeButton.js
    let btn = new UE.ui.Button({
        name: 'simpleupload' + uiName,
        title: '请选择图片',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -726px -77px;',
        onclick: function () {
            //渲染dialog
            //dialog.render();
            //dialog.open();

            //console.log(upload);

            //创建二次开发上传的节点
            var id = "ueEditorCustomUpload" + new Date() * 1;
            var div = document.createElement("div");
            div.className = "ue-editor-dev-upload";
            div.id = id;
            div.innerHTML = '<editor-multi-upload ref="up" @ok="ok"></editor-multi-upload>';
            document.body.appendChild(div);

            new Vue({
                components: { editorMultiUpload },
                el: "#" + id,
                data () {
                    return {
                        isShow: false
                    }
                },
                mounted () {
                    this.show();
                },
                methods: {
                    show () {
                        this.$refs.up.show();
                    },
                    hide () {
                        this.$refs.up.hide();
                    },
                    ok (s) {
                        //子页面确认了，所有需要的图片链接都在s里面
                        console.log(s);

                        if (s != "") {
                            editor.execCommand('insertimage', {
                                src: s,
                                width: '600'
                            });
                        }

                        //insertimage
                        /*for(var i = 0; i < 2; i++){
                            editor.execCommand( 'insertimage', {
                                src:'https://base-net.oss-cn-hangzhou.aliyuncs.com/images/1522067454575simpleupload11.jpg',
                                width: '100',
                                height: '100'
                            });
                        }*/
                    }
                }
            });
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
