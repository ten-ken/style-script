var _editIndex = undefined;
var _cmenu_;
var _table_id__ = "#dg";
var e_this_;

var EasyGrid = function(options) {
	e_this_ = this;
	this._options = options;
	this._default = this.defaultConfig();
	var _options = this._options;
	if (!_options.el) {
		throw new Error("el不能为空 为table的id值");
	}
	if (!_options.url) {
		throw new Error("url不能为空");
	}

	//此处得到配置信息  前提是未设置配置行的信息部分  设置了行的属性配置 默认不读取dom部分设置的行属性
	if (!_options.columns) {
		var _columns_ = [
			[]
		];
		var t_option;
		console.log(_options);
		$(_options.el + " thead tr:eq(0) th").each(function(index) {
			t_option = '\{' + $(this).attr("data-options") + '\}';
			t_option = eval('(' + t_option + ')');
			t_option.title = t_option.title || $(this).text();
			_columns_[0].push(t_option);
		});
		// console.log(_columns_);
		_options.columns = _columns_;
	}

	var columns = _options.columns;
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
			filterMenu: true,
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
							// 
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
							console.log(editObj.editor.options.textField);
							rowData[editObj.editor.options.textField] = $(ed.target).combogrid('getText');
						}
					}
				}
			},
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
		//是否默认的点击单元格编辑事件
		if (_options_.clickCellEdit) {
			this._default.onClickCell = this._onClickCell;
		}
		//是否开启语句菜单
		console.log(_options_.filterMenu);
		if (_options_.filterMenu != false && this._default.filterMenu) {
			this._default.onHeaderContextMenu = this.onHeaderContextMenu;
		}

		this._options.frozenColumns = frozenColumns;
	},
	init: function() {
		var _options = this._options;
		var _newOptions = this._default;
		Object.assign(_newOptions, _options);
		if (_options.selectionMode) {
			$(_options.el).after(this.selectionMode());
		}
		var op = $(_newOptions.el).datagrid(_newOptions);

		if (_newOptions.enableFilter) {
			op.datagrid('enableFilter', _newOptions.filterConfig || []);
			var ignores = _newOptions.filterIngores;
			for (var ind in ignores) {
				$(".datagrid-filter-row .datagrid-filter[name='" + ignores[ind] + "']").parents(".datagrid-filter-c").remove();
			}
			// console.log(_newOptions.filterIngores)
		}
	},
	formatAction: function(value, row, index) {
		var len_first = Object.keys(e_this_._options.columns[0][0]).length;
		var len_cur = Object.getOwnPropertyNames(row).length;
		if (len_first > len_cur) {
			return '';
		}
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
	},
	selectionMode: function() { //多选模式开启
		var modes = '<div style="margin:10px 0;" ><span>单行选择: </span>';
		modes += '<select onchange="_changemodel(this)">';
		modes += '<option value="0">是</option>';
		modes += '<option value="1">否</option>';
		modes += '</select></div>';
		console.log(modes)
		return modes;
	},
	//创建语境菜单
	onHeaderContextMenu: function(e, field) {
		e.preventDefault();
		if (!_cmenu_) {
			_createColumnMenu();
		}
		_cmenu_.menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	}
}

/************end***************/

function _endEditing() {
	if (_editIndex == undefined) {
		return true
	}
	if ($(_table_id__).datagrid('validateRow', _editIndex)) {
		$(_table_id__).datagrid('endEdit', _editIndex);
		_editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
//添加一行
function _append() {
	if (_endEditing()) {
		$(_table_id__).datagrid('appendRow', {});
		_editIndex = $(_table_id__).datagrid('getRows').length - 1;
		$(_table_id__).datagrid('selectRow', _editIndex)
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
	$(_table_id__).datagrid('beginEdit', _getRowIndex(target));
}

//删除行
function _deleterow(target) {
	$.messager.confirm('Confirm', 'Are you sure?', function(r) {
		if (r) {
			$(_table_id__).datagrid('deleteRow', _getRowIndex(target));
		}
	});
}

function _saverow(target) {
	$(_table_id__).datagrid('endEdit', _getRowIndex(target));
}

function _cancelrow(target) {
	$(_table_id__).datagrid('cancelEdit', _getRowIndex(target));
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
	var rows = $(_table_id__).datagrid('getRows');
	console.log(rows);
}


//删除当前行
function _removeit() {
	var flag = easyGrid._options.singleSelect; //若开启多行选择
	if (!flag) {
		var ids = [];
		var rows = $(_table_id__).datagrid('getSelections');
		for (var ind = 0; ind < rows.length; ind++) {
			var index = $(_table_id__).datagrid('getRowIndex', rows[ind]);
			if (_editIndex == index) {
				_editIndex = undefined;
			}
			$(_table_id__).datagrid('cancelEdit', index).datagrid('deleteRow', index);
		}
	} else {
		if (_editIndex == undefined) {
			return
		}
		$(_table_id__).datagrid('cancelEdit', _editIndex)
			.datagrid('deleteRow', _editIndex);
		_editIndex = undefined;
	}
}

//保存操作 ---相当于确认修改的操作
function _accept() {
	if (_endEditing()) {
		$(_table_id__).datagrid('acceptChanges');
		return true;
	} else {
		return false;
	}
}

//回退操作
function _reject() {
	$(_table_id__).datagrid('rejectChanges');
	_editIndex = undefined;
}

function getChanges() {
	var rows = $(_table_id__).datagrid('getChanges');
	alert(rows.length + ' rows are changed!');
}


function _changemodel(_this) {
	easyGrid._options.singleSelect = _this.value == 0;
	console.log(_this.value);
	$(easyGrid._default.el).datagrid({
		singleSelect: (_this.value == 0)
	});
}


//语境菜单---实际操作部分
function _createColumnMenu() {
	_cmenu_ = $('<div/>').appendTo('body');
	_cmenu_.menu({
		onClick: function(item) {
			if (item.iconCls == 'icon-ok') {
				$(_table_id__).datagrid('hideColumn', item.name);
				_cmenu_.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-empty'
				});
			} else {
				$(_table_id__).datagrid('showColumn', item.name);
				_cmenu_.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-ok'
				});
			}
		}
	});
	var fields = $(_table_id__).datagrid('getColumnFields');
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var col = $(_table_id__).datagrid('getColumnOption', field);
		_cmenu_.menu('appendItem', {
			text: col.title,
			name: field,
			iconCls: 'icon-ok'
		});
	}
}





//解决ie9不兼容的Object.assign问题 
if (typeof Object.assign != 'function') {
	Object.assign = function(target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}


