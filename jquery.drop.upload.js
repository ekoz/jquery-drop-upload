/**
 * @auther eko.zhan
 * @since 2017-12-22
 */
;(function($){
    $.fn.extend({
        dropUpload: function(opts){
            opts = $.extend({
                text: '将文件拖拽到此区域',
                responseType: 'json',
                allowTypes: [],
                name: 'file'
            }, opts);
            var _this = this;
            //阻止浏览器默认行为。
            $(document).on({
                dragleave: function(e){    //拖离
                    e.preventDefault();
                },
                drop: function(e){  //拖后放
                    var e = e || window.event;
                    e.preventDefault();
                    e.stopPropagation();
                },
                dragenter: function(e){    //拖进
                    e.preventDefault();
                },
                dragover: function(e){    //拖来拖去
                    e.preventDefault();
                }
            });
            $(_this).addClass('kbs-drop-area').text(opts.text);

            //drag file over current div
            _this[0].addEventListener("dragover", function(e){
                $(_this).addClass('kbs-over-area');
            });

            //drag file out of current div
            _this[0].addEventListener("dragleave", function(e){
                $(_this).removeClass('kbs-over-area');
            });

            //drag file over current div, and drop it
            _this[0].addEventListener("drop", function(e){
                var e = e || window.event;
                e.preventDefault();
                e.stopPropagation();
                $(_this).removeClass('kbs-over-area');
                var fileList = e.dataTransfer.files; //获取文件对象
                //检测是否是拖拽文件到页面的操作
                if (fileList.length==0){
                    return false;
                }
                //校验文件类型是否在允许的文件类型范围内
                if (opts.allowTypes.length>0){
                    var fileType = fileList[0].type;
                    if (fileType.indexOf('/')!=-1) fileType = fileType.substring(0, fileType.indexOf('/'));
                    if ($.inArray(fileType, opts.allowTypes)==-1){
                        //TODO 可以增加回调函数，用于提示用户只能上传哪种类型的文件
                        return false;
                    }
                }

                var formData = new FormData();
                formData.append(opts.name, fileList[0]);

                $.ajax({
                    type: 'POST',
                    url: opts.url,
                    data: formData,
                    dataType: opts.responseType,
                    contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置(详见：#1)
                    processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post，详见：#2)
                    success: function(response) {
                        if (opts.callback) opts.callback(response);

                    }
                });
            }, false);
        }
    })

})(jQuery);