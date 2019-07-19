/*
* 设计器私有的配置说明 
* 一 UE.leipiFormDesignUrl  插件路径
* 二 UE.getEditor('myFormDesign',{ toolleipi:true,}) //是否显示，设计器的清单 tool
*/
UE.leipiFormDesignUrl = 'formdesign';


/**
 * 插入图表
 */
UE.plugins['vchart-macros'] = function () {
    var me = this,thePlugins = 'vchart-macros';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/vchart-macros.html',
                name:thePlugins,
                editor:this,
                title: '图表',
                cssRules:"width:1000px;height:400px;",
                buttons:[{
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                },{
                    className:'edui-cancelbutton',
                    label:'取消',
                    onclick:function () {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        },
		//创建一个改变图片边框的命令
		clickCommand:function () {
			//获取当前选区
			var range = me.selection.getRange();
			//选区没闭合的情况下操作
			if ( !range.collapsed ) {
				//图片判断
				var img = range.getClosedNode();
				if ( img && img.tagName == "object" ) {
					//点击切换图片边框
					img.style.border = img.style.borderWidth == "5px"?"1px":"5px solid red";
				}
			}
		}
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
              baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
              me.execCommand(thePlugins);
              this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        },
		_setIframeAlign:function (value) {
			var frame = popup.anchorEl;
			var newFrame = frame.cloneNode(true);
			switch (value) {
				case -2:
					newFrame.setAttribute("align", "");
					break;
				case -1:
					newFrame.setAttribute("align", "left");
					break;
				case 1:
					newFrame.setAttribute("align", "right");
					break;
			}
			frame.parentNode.insertBefore(newFrame, frame);
			baidu.editor.dom.domUtils.remove(frame);
			popup.anchorEl = newFrame;
			popup.showAnchor(popup.anchorEl);
		},
		
		
    } );
    popup.render();
    me.addListener( 'mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('mynzplugins');
		if (/object/ig.test( el.tagName ) &&  leipiPlugins === thePlugins) {
            var html = popup.formatHtml(
                '<nobr>图表:' +
					'<span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;' + 
					'<span onclick=$$._delete() class="edui-clickable">删除</span>&nbsp;' + 
					'<span onclick=$$._setIframeAlign(-1) class="edui-clickable">左对齐</span>&nbsp;' + 
					'<span onclick=$$._setIframeAlign(-2) class="edui-clickable">居中对齐</span>&nbsp;' +
					'<span onclick=$$._setIframeAlign(1) class="edui-clickable">右对齐</span>&nbsp;' +
				'</nobr>' 
				);
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
		return false;		
    });
};


/**
 * 日期宏控件
 */
UE.plugins['date-macros'] = function () {
    var me = this,thePlugins = 'date-macros';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/date-macros.html',
                name:thePlugins,
                editor:this,
                title: '日期宏控件',
                cssRules:"width:290px;height:60px;",
                buttons:[{
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                },{
                    className:'edui-cancelbutton',
                    label:'取消',
                    onclick:function () {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        }
    } );
    popup.render();
    me.addListener('mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('nzplugins');
        if ( /span/ig.test( el.tagName ) && leipiPlugins==thePlugins) {
            var html = popup.formatHtml('<nobr>日期宏: <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
};


/**
 * 诊断结果
 */
UE.plugins['diagnosis-results'] = function () {
    var me = this,thePlugins = 'diagnosis-results';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/diagnosis-results-macros.html',
                name:thePlugins,
                editor:this,
                title: '诊断报告控件',
                cssRules:"width:1000px;height:400px;",
                buttons:[{
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                },{
                    className:'edui-cancelbutton',
                    label:'取消',
                    onclick:function () {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _edittext: function () {
              baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
              me.execCommand(thePlugins);
              this.hide();
        },
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        },
        _setIframeAlign:function (value) {
			var frame = popup.anchorEl;
			var newFrame = frame.cloneNode(true);
			switch (value) {
				case -2:
					newFrame.setAttribute("align", "");
					break;
				case -1:
					newFrame.setAttribute("align", "left");
					break;
				case 1:
					newFrame.setAttribute("align", "right");
					break;
			}
			frame.parentNode.insertBefore(newFrame, frame);
			baidu.editor.dom.domUtils.remove(frame);
			popup.anchorEl = newFrame;
			popup.showAnchor(popup.anchorEl);
		},
    } );
    popup.render();
    me.addListener( 'mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('nzplugins');
        if (leipiPlugins==thePlugins) {
            var html = popup.formatHtml(
                '<nobr>控件:' +
					'<span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;' + 
					'<span onclick=$$._delete() class="edui-clickable">删除</span>&nbsp;' + 
					'<span onclick=$$._setIframeAlign(-1) class="edui-clickable">左对齐</span>&nbsp;' + 
					'<span onclick=$$._setIframeAlign(-2) class="edui-clickable">居中对齐</span>&nbsp;' +
					'<span onclick=$$._setIframeAlign(1) class="edui-clickable">右对齐</span>&nbsp;' +
				'</nobr>' 
                );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
};

/**
 * 模版插件
 */
UE.plugins['nz-template'] = function () {
    var me = this,thePlugins = 'nz-template';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/template-macros.html',
                name:thePlugins,
                editor:this,
                title: '模板',
                cssRules:"width:1200px;height:660px;",
                buttons:[{
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

/**
 * 错误提示
 */
UE.plugins['error'] = function () {
    var me = this,thePlugins = 'error';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/error.html',
                name:thePlugins,
                editor:this,
                title: '异常提示',
                cssRules:"width:400px;height:130px;",
                buttons:[{
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

/**
 * 上传图片
 */
UE.plugins['uploadimg'] = function () {
    var me = this,thePlugins = 'uploadimg';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl+'/uploadimg.html',
                name:thePlugins,
                editor:this,
                title: '上传图片',
                cssRules:"width:600px;height:80px;",
                buttons:[]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup( {
        editor:this,
        content: '',
        className: 'edui-bubble',
        _delete:function(){
            if( window.confirm('确认删除该控件吗？') ) {
                baidu.editor.dom.domUtils.remove(this.anchorEl,false);
            }
            this.hide();
        }
    } );
    popup.render();
    me.addListener('mouseover', function( t, evt ) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('nzplugins');
        if ( /img/ig.test( el.tagName ) && leipiPlugins==thePlugins) {
            var html = popup.formatHtml('<nobr>图片: <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>' );
            if ( html ) {
                popup.getDom( 'content' ).innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor( popup.anchorEl );
            } else {
                popup.hide();
            }
        }
    });
};


/*----------------------------------------------------------------------------------------------按钮注册--------------------------------------------------------------------------------- */

/**
 *  添加 宏控件 按钮
 */
UE.registerUI('btn-date-macros',function(editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                editor.execCommand('date-macros');
            } catch ( e ) {
                console.log(e);
                alert('打开日期宏遇到了问题，可能猿哥们正在开发中...');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"日期宏",
        //点击时执行的命令
        onclick:function () {
           editor.execCommand(uiName); //这里可以不用执行命令,做你自己的操作也可
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 *  添加模版 按钮
 */
UE.registerUI('btn-nz-template',function(editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                editor.execCommand('nz-template');
            } catch ( e ) {
                alert('打开日期宏遇到了问题，可能该控件正在开发中...');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"模板",
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 *  添加图表 按钮
 */
UE.registerUI('btn-data-vchart',function(editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
			try {
				editor.execCommand('vchart');
            } catch ( e ) {
                alert('vchart 异常');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"Echart图表",
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 诊断结果数据表格按钮
 */
UE.registerUI('btn-diagnosis-results',function(editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                editor.execCommand('diagnosis-results');
            } catch ( e ) {
                alert('打开日期宏遇到了问题，可能该控件正在开发中...');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"诊断结果宏",
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 个人任务
 */
UE.registerUI('btn-diagnosis-person-task',function(editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            editor.execCommand('person-task');
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"任务宏",
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 图片上传
 */
UE.registerUI('btn-uploadimg', function (editor,uiName){
    if(!this.options.toolleipi){
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            editor.execCommand('uploadimg');
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"上传图片",
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
