## 一款基于Html5浏览器的文件上传插件

### 依赖于jquery
[jquery](http://jquery.com/)

### 引入方法
```
<link href="jquery.drop.upload.css" rel="stylesheet">
<script type="text/javascript" src="jquery.drop.upload.js"></script>
```

### 调用方法
```
$('#dropArea').dropUpload({
    text: '将视频/图片拖拽到此区域',
    url: 'demo.json', // URL of server-side upload handler
    name: 'file', // Parameter name of the uploaded file
    responseType: 'json',
    allowTypes: ['image', 'video', 'audio'],
    callback: function(response){
        if (!response) {
            alert(filename + ' 上传失败');
            return false;
        }
        //alert(filename + ' 上传成功');

        console.log(response.text);
        $('#dropArea').after(response.text);
    }
});
```

### 属性说明
<table>
    <tr>
        <td><b>名称</b></td>
        <td><b>描述</b></td>
    </tr>
    <tr>
        <td>text</td>
        <td>拖拽区域文本描述，默认显示"将文件拖拽到此区域"</td>
    </tr>
    <tr>
        <td>url</td>
        <td>文件上传地址</td>
    </tr>
    <tr>
        <td>name</td>
        <td>字段名称，用于后台接收文件，默认为file，例如 MultipartFile file = request.getFile("file");</td>
    </tr>
    <tr>
        <td>responseType</td>
        <td>返回数据类型，和 jquery ajax dataType 参数一致，默认为json</td>
    </tr>
    <tr>
        <td>allowTypes</td>
        <td>允许上传的文件类型，和 File ContentType 返回的数据 / 前面内容一致，默认允许所有类型</td>
    </tr>
    <tr>
        <td>callback</td>
        <td>文件上传成功后回调函数</td>
    </tr>
</table>

### Demo
[点击这里](demo.html)