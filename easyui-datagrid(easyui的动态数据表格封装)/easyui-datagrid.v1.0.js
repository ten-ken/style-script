var _editIndex = undefined;

var EasyGrid = function(options) {
	this._options = options;
	this._default = this.defaultConfig();
    let _options = this._options;
	if (!_options.el) {
		throw new Error("el不能为空 为table的id值");
	}
	if (!_options.url) {
		throw new Error("url不能为空");
	}

    //此处得到配置信息  前提是未设置配置行的信息部分  设置了行的属性配置 默认不读取dom部分设置的行属性
	if(!_options.columns){
        let _columns_ =[[]];
        let t_option;
        console.log(_options);
        $(_options.el+" thead tr:eq(0) th").each(function(index){
            t_option ='\{'+$(this).attr("data-options")+'\}';
            t_option =eval('(' + t_option + ')');
            t_option.title=t_option.title||$(this).text();
            _columns_[0].push(t_option);
        });
        // console.log(_columns_);
        _options.columns =_columns_;
	}

    let columns = _options.columns;
	if (!_options.columns) {
		throw new Error("columns不能为空");
	}
	this.hander();
	this.init();
}

EasyGrid.prototype = {
	constructor: EasyGrid,
	defaultConfig: function() {
		var defaultConfig = {
			method: 'get',
			showHeader: true, //显示头部
			toolbar: "#toolbar",
			singleSelect: true,
			pagination: true, //开启分页
			pageSize: 10,
			pageNumber: 1,
			pageList: [10, 20, 50, 100],
			frozenColumns: [],
			columns: [],
			onBeforeEdit: function(index, row) {
				$(this).datagrid('updateRow', {
					index: index,
					row: {
						editing: true
					}
				})
			},
			onAfterEdit: function(index, row) {
				$(this).datagrid('updateRow', {
					index: index,
					row: {
						editing: false
					}
				})
			},
			onCancelEdit: function(index, row) {
				$(this).datagrid('updateRow', {
					index: index,
					row: {
						editing: false
					}
				})
			},
			onBeginEdit: function(rowIndex, rowData) {
				
			},
			//结束编辑
			onEndEdit: function(rowIndex, rowData) {
				var _frozenColumns_ = easyGrid._default.frozenColumns[0];
				var _columns_ = easyGrid._default.columns[0];
				var type;
				var editCols = [];
				var editObj;
				for (var ind1 in _frozenColumns_) {
					if (_frozenColumns_[ind1].editor) {
						type = _frozenColumns_[ind1].editor.type;
						if (type == "combogrid" || type == "combobox" || type == "combotreegrid") {
							editObj = _frozenColumns_[ind1];
							var ed = $(this).datagrid('getEditor', {
								index: rowIndex,
								field: editObj.field
							});
							rowData[editObj.editor.options.textField] = $(ed.target).combogrid('getText');
						}
					}
				}
				for (var ind1 in _columns_) {
					if (_columns_[ind1].editor) {
						type = _columns_[ind1].editor.type;
						if (type == "combogrid" || type == "combobox" || type == "combotreegrid") {
							editObj = _columns_[ind1];
							var ed = $(this).datagrid('getEditor', {
								index: rowIndex,
								field: editObj.field
							});
							rowData[editObj.editor.options.textField] = $(ed.target).combogrid('getText');
						}
					}
				}
			}
		}
		return defaultConfig;
	},
	hander: function() {
		var _options_ = this._options;
		var actionConfig = _options_.actionConfig;
		var width_ = 0;
		var height_ = 0;

		var columns = this._options.columns || [];
		var _columns = columns[0];
		var frozenColumns = [
			[]
		];
		var frozenOjb;

		if (actionConfig && actionConfig.need) {
			var ind = this._options.actionConfig.location || 0;
			if (ind >= 0) {
				_columns.splice(ind, 0, actionConfig);
			} else {
				_columns.push(actionConfig);
			}
			if (typeof(actionConfig.formatter) != 'function') {
				actionConfig.formatter = this.formatAction; //使用默认的方法
			}
		}
		for (var ind = _columns.length - 1; ind >= 0; ind--) {
			if (_columns[ind].fixed) {
				frozenOjb = _columns[ind];
				_columns.splice(ind, 1);
				frozenColumns[0].unshift(frozenOjb);
			}
			width_ += _columns[ind].width || 70;
		}
		// console.log(frozenColumns);
		if (width_ > 0 && this._options.autoWidth) {
			this._options.width = width_ + 10;
		}

		if (_options_.clickCellEdit) {
			_options_.onClickCell = this._onClickCell;
		}

		this._options.frozenColumns = frozenColumns;
	},
	init: function() {
		var _options = this._options;
		var _newOptions = this._default;
		Object.assign(_newOptions, _options);
		// console.log(_newOptions);
		$(_newOptions.el).datagrid(_newOptions);

	},
	formatAction: function(value, row, index) {
		if (row.editing) {
			var s = '<a href="#" onclick="_saverow(this)">完成</a> ';
			var c = '<a href="#" onclick="_cancelrow(this)">取消</a>';
			return s + c;
		} else {
			var e = '<a href="#" onclick="_editrow(this)">编辑</a> ';
			var d = '<a href="#" onclick="_deleterow(this)">删除</a>';
			return e + d;
		}
	},
	_onClickCell: function(index, field) {
		if (_editIndex != index) {
			if (_endEditing()) {
				$('#dg').datagrid('selectRow', index).datagrid('beginEdit', index);
				var ed = $('#dg').datagrid('getEditor', {
					index: index,
					field: field
				});
				if (ed) {
					($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
				}
				var ed = $('#dg').datagrid('getEditor', {
					index: index,
					field: field
				});
				_editIndex = index;
			} else {
				setTimeout(function() {
					$('#dg').datagrid('selectRow', _editIndex);
				}, 0);
			}
		}
	}
}



function _endEditing() {
	if (_editIndex == undefined) {
		return true
	}
	if ($('#dg').datagrid('validateRow', _editIndex)) {
		$('#dg').datagrid('endEdit', _editIndex);
		_editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
//添加一行
function _append() {
	if (_endEditing()) {
		$('#dg').datagrid('appendRow', {});
		_editIndex = $('#dg').datagrid('getRows').length - 1;
		$('#dg').datagrid('selectRow', _editIndex)
			.datagrid('beginEdit', _editIndex);
	}
}

//获取当前行
function _getRowIndex(target) {
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}

//编辑行
function _editrow(target) {
	$('#dg').datagrid('beginEdit', _getRowIndex(target));
}

//删除行
function _deleterow(target) {
	$.messager.confirm('Confirm', 'Are you sure?', function(r) {
		if (r) {
			$('#dg').datagrid('deleteRow', _getRowIndex(target));
		}
	});
}

function _saverow(target) {
	$('#dg').datagrid('endEdit', _getRowIndex(target));
}

function _cancelrow(target) {
	$('#dg').datagrid('cancelEdit', _getRowIndex(target));
}


//默认comboGrid 组合网格
function default_combogrid(options) {
	var config = {
		panelWidth: 500,
		idField: 'id',
		textField: 'text',
		method: 'get',
		columns: [],
		fitColumns: true,
		required: true
	};
	Object.assign(config, options);
	return config;
}

//默认树下拉框
function default_treegrid(options) {
	var combotreegrid = {
		method: 'get',
		width: '100%',
		panelWidth: 500,
		labelPosition: 'top',
		idField: 'id',
		treeField: 'text',
		columns: [],
		required: true
	}
	Object.assign(combotreegrid, options);
	return combotreegrid;
}

//默认的下拉框  很简单的模式
function default_combobox(options) {
	var config = {
		method: 'get',
		valueField: 'id',
		textField: 'text',
		required: true
	}
	Object.assign(config, options);
	return config;
}

//获取所有的数据 信息 
function _getData() {
	var rows = $('#dg').datagrid('getRows');
	console.log(rows);
}


//删除当前行
function _removeit() {
	if (_editIndex == undefined) {
		return
	}
	$('#dg').datagrid('cancelEdit', _editIndex)
		.datagrid('deleteRow', _editIndex);
	_editIndex = undefined;
}

//保存操作 ---相当于确认修改的操作
function _accept() {
    if (_endEditing()) {
        $('#dg').datagrid('acceptChanges');
        return true;
    } else {
        return false;
    }
}

//回退操作
function _reject() {
	$('#dg').datagrid('rejectChanges');
	_editIndex = undefined;
}

function getChanges() {
	var rows = $('#dg').datagrid('getChanges');
	alert(rows.length + ' rows are changed!');
}
