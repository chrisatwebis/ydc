function initPage()
{
/* 	clearFormFields({
		clearInputs: true,
		clearTextareas: true,
		passwordFieldText: false,
		addClassFocus: "focus",
		filterClass: "default"
	}); */
	initCastomForms();
/* 	VSA_initScrollbars();
 */}
function clearFormFields(o)
{
	if (o.clearInputs == null) o.clearInputs = true;
	if (o.clearTextareas == null) o.clearTextareas = true;
	if (o.passwordFieldText == null) o.passwordFieldText = false;
	if (o.addClassFocus == null) o.addClassFocus = false;
	if (!o.filterClass) o.filterClass = "default";
	if(o.clearInputs) {
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++ ) {
			if((inputs[i].type == "text" || inputs[i].type == "password") && inputs[i].className.indexOf(o.filterClass) == -1) {
				inputs[i].valueHtml = inputs[i].value;
				inputs[i].onfocus = function ()	{
					if(this.valueHtml == this.value) this.value = "";
					if(this.fake) {
						inputsSwap(this, this.previousSibling);
						this.previousSibling.focus();
					}
					if(o.addClassFocus && !this.fake) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				inputs[i].onblur = function () {
					if(this.value == "") {
						this.value = this.valueHtml;
						if(o.passwordFieldText && this.type == "password") inputsSwap(this, this.nextSibling);
					}
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
				if(o.passwordFieldText && inputs[i].type == "password") {
					var fakeInput = document.createElement("input");
					fakeInput.type = "text";
					fakeInput.value = inputs[i].value;
					fakeInput.className = inputs[i].className;
					fakeInput.fake = true;
					inputs[i].parentNode.insertBefore(fakeInput, inputs[i].nextSibling);
					inputsSwap(inputs[i], null);
				}
			}
		}
	}
	if(o.clearTextareas) {
		var textareas = document.getElementsByTagName("textarea");
		for(var i=0; i<textareas.length; i++) {
			if(textareas[i].className.indexOf(o.filterClass) == -1) {
				textareas[i].valueHtml = textareas[i].value;
				textareas[i].onfocus = function() {
					if(this.value == this.valueHtml) this.value = "";
					if(o.addClassFocus) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				textareas[i].onblur = function() {
					if(this.value == "") this.value = this.valueHtml;
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
			}
		}
	}
	function inputsSwap(el, el2) {
		if(el) el.style.display = "none";
		if(el2) el2.style.display = "inline";
	}
}


var _selectHeight = 25;
var inputs = new Array();
var selects = new Array();
var labels = new Array();
var radios = new Array();
var radioLabels = new Array();
var checkboxes = new Array();
var checkboxLabels = new Array();
var buttons = new Array();
var selects = new Array();
var all_selects = false;
var active_select = null;
var selectText = "please select";

function is_mac() {
	if (navigator.appVersion.indexOf("Safari") != -1)
	{
		if(!window.getComputedStyle)
		{
			return true;
		}
	}
	
	return false;
}

function initCastomForms() {
	if(!document.getElementById) {return false;}
	getElements();
	//separateElements();
	//replaceRadios();
	/*replaceCheckboxes();*/
	replaceSelects();

	var _selects = document.getElementsByTagName('select');
	var _SelctClassName = [];
	if (_selects) {
		for (var i = 0; i < _selects.length; i++) {
			if (_selects[i].className != '' && _selects[i].className != 'outtaHere')
				_SelctClassName[i] = ' drop-'+_selects[i].className;
		}
		for (var i = 0; i < _SelctClassName.length; i++) {
			var _selectDrop = document.getElementById('optionsDiv'+i);
			if (_selectDrop) {
				if (_SelctClassName[i]) 
					_selectDrop.className += _SelctClassName[i];
			}
		}
	}
}


// getting all the required elements
function getElements() {
	var _frms = document.getElementsByTagName("form");
	for (var nf = 0; nf < _frms.length; nf++) {
		if(_frms[nf].className.indexOf("default") == -1) {
			var a = document.forms[nf].getElementsByTagName("input");
			for(var nfi = 0; nfi < a.length; nfi++) {
				inputs.push(a[nfi]);
			}
			var b = document.forms[nf].getElementsByTagName("label");
			for(var nfl = 0; nfl < b.length; nfl++) {
				labels.push(b[nfl]);
			}
			var c = document.forms[nf].getElementsByTagName("select");
			for(var nfs = 0; nfs < c.length; nfs++) {
				selects.push(c[nfs]);
			}
		}
	}
}

// separating all the elements in their respective arrays
function separateElements() {
	var r = 0; var c = 0; var t = 0; var rl = 0; var cl = 0; var tl = 0; var b = 0;
	for (var q = 0; q < inputs.length; q++) {
		if(inputs[q].type == "radio") {
			radios[r] = inputs[q]; ++r;
			for(var w = 0; w < labels.length; w++) {
				if((inputs[q].id) && labels[w].htmlFor == inputs[q].id)
				{
					radioLabels[rl] = labels[w];
				}
			}
			++rl;
		}
		if(inputs[q].type == "checkbox") {
			checkboxes[c] = inputs[q]; ++c;
			for(var w = 0; w < labels.length; w++) {
				if((inputs[q].id) && (labels[w].htmlFor == inputs[q].id))
				{
					checkboxLabels[cl] = labels[w];
				}
			}
			++cl;
		}
		if((inputs[q].type == "submit") || (inputs[q].type == "button")) {
			buttons[b] = inputs[q]; ++b;
		}
	}
}

//replacing radio buttons
function replaceRadios() {
	for (var q = 0; q < radios.length; q++) {
		radios[q].className += " outtaHere";
		var radioArea = document.createElement("div");
		if(radios[q].checked) {
			radioArea.className = "radioAreaChecked";
			if (radioLabels[q])
			{
				radioLabels[q].className += "radioAreaCheckedLabel"
			}
			
		}
		else
		{
			radioArea.className = "radioArea";
		}
		radioArea.id = "myRadio" + q;
		radios[q].parentNode.insertBefore(radioArea, radios[q]);
		radios[q]._ra = radioArea;

		radioArea.onclick = new Function('rechangeRadios('+q+')');
		if (radioLabels[q])
		{
			radioLabels[q].onclick = new Function('rechangeRadios('+q+')');
		}
	}
	return true;
}

//checking radios
function checkRadios(who) {
	var what = radios[who]._ra;
	for(var q = 0; q < radios.length; q++) {
		if((radios[q]._ra.className == "radioAreaChecked")&&(radios[q]._ra.nextSibling.name == radios[who].name))
		{
			radios[q]._ra.className = "radioArea";
			if (radioLabels[q])
			{
				radioLabels[q].className = radioLabels[q].className.replace("radioAreaCheckedLabel", "");
			}
		}
	}
	what.className = "radioAreaChecked";
	if(radioLabels[who])
		radioLabels[who].className += " radioAreaCheckedLabel";
}

//changing radios
function changeRadios(who) {
	if(radios[who].checked) {
		for(var q = 0; q < radios.length; q++) {
			if(radios[q].name == radios[who].name) {
				radios[q].checked = false;
			} 
			radios[who].checked = true; 
			checkRadios(who);
		}
	}
}

//rechanging radios
function rechangeRadios(who) {
	if(!radios[who].checked) {
		for(var q = 0; q < radios.length; q++) {
			if(radios[q].name == radios[who].name)	{
				radios[q].checked = false; 
			}
			radios[who].checked = true; 
			checkRadios(who);
		}
	}
}

//replacing checkboxes
function replaceCheckboxes() {
	for (var q = 0; q < checkboxes.length; q++) {
		checkboxes[q].className += " outtaHere";
		var checkboxArea = document.createElement("div");
		if(checkboxes[q].checked) {
			checkboxArea.className = "checkboxAreaChecked";
			if(checkboxLabels[q])
				checkboxLabels[q].className += "checkboxAreaCheckedLabel"
		}
		else {
			checkboxArea.className = "checkboxArea";
		}
		checkboxArea.id = "myCheckbox" + q;
		checkboxes[q].parentNode.insertBefore(checkboxArea, checkboxes[q]);
		checkboxes[q]._ca = checkboxArea;
		checkboxArea.onclick = checkboxArea.onclick2 = new Function('rechangeCheckboxes('+q+')');
		if (checkboxLabels[q])
		{
			checkboxLabels[q].onclick = new Function('changeCheckboxes('+q+')');
		}
		
		checkboxes[q].onkeydown = checkEvent;
	}
	return true;
}

//checking checkboxes
function checkCheckboxes(who, action) {
	var what = checkboxes[who]._ca;
	if(action == true) {
		what.className = "checkboxAreaChecked";
		what.checked = true;
		if(checkboxLabels[who])
			checkboxLabels[who].className += " checkboxAreaCheckedLabel";
	}
	if(action == false) {
		what.className = "checkboxArea";
		what.checked = false;
		if(checkboxLabels[who])
			checkboxLabels[who].className = checkboxLabels[who].className.replace("checkboxAreaCheckedLabel", "");
	}
}

//changing checkboxes
function changeCheckboxes(who) {
	if(checkboxes[who].checked) {
		checkCheckboxes(who, false);
	}
	else {
		checkCheckboxes(who, true);
	} 
}

//rechanging checkboxes
function rechangeCheckboxes(who) {
	var tester = false;
	if(checkboxes[who].checked == true) {
		tester = false;
	}
	else {
		tester = true;
	}
	checkboxes[who].checked = tester;
	checkCheckboxes(who, tester);
}

//check event
function checkEvent(e) {
	if (!e) var e = window.event;
	if(e.keyCode == 32) {for (var q = 0; q < checkboxes.length; q++) {if(this == checkboxes[q]) {changeCheckboxes(q);}}} //check if space is pressed
}


function replaceSelects() {
	for(var q = 0; q < selects.length; q++) {
	if (!selects[q].replaced && selects[q].offsetWidth && selects[q].className.indexOf("default") == -1)
	{
		selects[q]._number = q;
		//create and build div structure
		var selectArea = document.createElement("div");
		var left = document.createElement("span");
		left.className = "left";
		selectArea.appendChild(left);
		
		var disabled = document.createElement("span");
		disabled.className = "disabled";
		selectArea.appendChild(disabled);
		
		selects[q]._disabled = disabled;
		var center = document.createElement("span");
		var button = document.createElement("a");
		var text = document.createTextNode(selectText);
		center.id = "mySelectText"+q;
		
		var stWidth = selects[q].offsetWidth;
		selectArea.style.width = stWidth + "px";
		if (selects[q].parentNode.className.indexOf("type2") != -1){
			button.href = "javascript:showOptions("+q+",true)";
		} else {
			button.href = "javascript:showOptions("+q+",false)";
		}
		button.className = "selectButton";
		selectArea.className = "selectArea";

		selectArea.className += " " + selects[q].className;
		selectArea.id = "sarea"+q;
		center.className = "center";
		center.appendChild(text);
		selectArea.appendChild(center);
		selectArea.appendChild(button);
		
		//hide the select field
		selects[q].className += " outtaHere";
		//insert select div
		selects[q].parentNode.insertBefore(selectArea, selects[q]);
		//build & place options div

		var optionsDiv = document.createElement("div");
		var optionsListParent = document.createElement("div");
		optionsListParent.className = "select-center";
		var optionsListParent2 = document.createElement("div");
		optionsListParent2.className = "select-center-right";
		var optionsList = document.createElement("ul");
		optionsDiv.innerHTML += "<div class='select-top'><div class='select-top-left'></div><div class='select-top-right'></div></div>";
		optionsListParent.appendChild(optionsListParent2);
		optionsListParent.appendChild(optionsList);
		optionsDiv.appendChild(optionsListParent);
		
		selects[q]._options = optionsList;
		
		optionsDiv.style.width = stWidth + "px";
		optionsDiv._parent = selectArea;
		
		optionsDiv.className = "optionsDivInvisible";
		optionsDiv.id = "optionsDiv"+q;
		
	
		populateSelectOptions(selects[q]);
		optionsDiv.innerHTML += "<div class='select-bottom'><div class='select-bottom-left'></div><div class='select-bottom-right'></div></div>";
		document.getElementsByTagName("body")[0].appendChild(optionsDiv);
		selects[q].replaced = true;
		}
	all_selects = true;
	}
}

//collecting select options
function populateSelectOptions(me) {
	me._options.innerHTML = "";
	
	for(var w = 0; w < me.options.length; w++) {
		if(me.options[w].title.indexOf("title") == -1) {
			var optionHolder = document.createElement('li');
			var optionLink = document.createElement('a');
			var optionTxt;
			if (me.options[w].title.indexOf('image') != -1) {
				optionTxt = document.createElement('img');
				optionSpan = document.createElement('span');
				optionTxt.src = me.options[w].title;
				optionSpan = document.createTextNode(me.options[w].text);
			} else {
				optionTxt = document.createTextNode(me.options[w].text);
			}
			
			optionLink.href = "javascript:showOptions("+me._number+"); selectMe('"+me.id+"',"+w+","+me._number+");triggerchange('"+me.id+"');";
			if (me.options[w].title.indexOf('image') != -1) {
				optionLink.appendChild(optionTxt);
				optionLink.appendChild(optionSpan);
			} else {
				optionLink.appendChild(optionTxt);
			}
			optionHolder.appendChild(optionLink);
			me._options.appendChild(optionHolder);
			//check for pre-selected items
			if(me.options[w].selected) {
				selectMe(me.id,w,me._number);
			}
		}
		else if(me.options[w].selected)
			selectMe(me.id,w,me._number);
	}
	if (me.disabled) {
		me._disabled.style.display = "block";
	}
	else {
		me._disabled.style.display = "none";
	}
}
function triggerchange(selectFieldId)
{
	$("#"+selectFieldId).trigger("change");
}
//selecting me
function selectMe(selectFieldId,linkNo,selectNo) {
	selectField = selects[selectNo];
	
	for(var k = 0; k < selectField.options.length; k++) {
		if(k==linkNo) {
			selectField.options[k].selected = true;
		}
		else {
			selectField.options[k].selected = false;
		}
	}
	
	//show selected option
	textVar = document.getElementById("mySelectText"+selectNo);
	var newText;
	var optionSpan;
	if (selectField.options[linkNo].title.indexOf('image') != -1) {
		newText = document.createElement('img');
		newText.src = selectField.options[linkNo].title;
		optionSpan = document.createElement('span');
		optionSpan = document.createTextNode(selectField.options[linkNo].text);
	} else {
		newText = document.createTextNode(selectField.options[linkNo].text);
	}
	if (selectField.options[linkNo].title.indexOf('image') != -1) {
		if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
		textVar.replaceChild(newText, textVar.childNodes[0]);	
		textVar.appendChild(optionSpan);	
		
	} else {
		if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
		textVar.replaceChild(newText, textVar.childNodes[0]);	
	}
	if (selectField.onchange && all_selects)
	{
		eval(selectField.onchange());
	}
	
}
//showing options
function showOptions(g) {
		_elem = document.getElementById("optionsDiv"+g);
		var divArea = document.getElementById("sarea"+g);
		if (active_select && active_select != _elem) {
			active_select.className = active_select.className.replace('optionsDivVisible','optionsDivInvisible');
			active_select.style.height = "auto";
			_active.className = _active.className.replace('selectAreaActive','');
		}
		if(_elem.className.indexOf("optionsDivInvisible") != -1) {
			_elem.style.left = "-9999px";
			_elem.style.top = findPosY(divArea) + _selectHeight + 'px';
			_elem.className = _elem.className.replace('optionsDivInvisible','');
			_elem.className += " optionsDivVisible";
			/*if (_elem.offsetHeight > 200)
			{
				_elem.style.height = "200px";
			}*/
			_elem.style.left = findPosX(divArea) + 'px';
			divArea.className += ' selectAreaActive';
			_active = divArea;
			
			active_select = _elem;
			if(document.documentElement)
			{
				document.documentElement.onclick = hideSelectOptions;
			}
			else
			{
				window.onclick = hideSelectOptions;
			}
		}
		else if(_elem.className.indexOf("optionsDivVisible") != -1) {
			_elem.style.height = "auto";
			_elem.className = _elem.className.replace('optionsDivVisible','');
			_elem.className += " optionsDivInvisible";
			divArea.className = divArea.className.replace('selectAreaActive','');
		}
		
		// for mouseout
		/*_elem.timer = false;
		_elem.onmouseover = function() {
			if (this.timer) clearTimeout(this.timer);
		}
		_elem.onmouseout = function() {
			var _this = this;
			this.timer = setTimeout(function(){
				_this.style.height = "auto";
				_this.className = _this.className.replace('optionsDivVisible','');
				if (_elem.className.indexOf('optionsDivInvisible') == -1)
					_this.className += " optionsDivInvisible";
			},200);
		}*/
}
_active = false;
function hideSelectOptions(e)
{
	if(active_select)
	{
		if(!e) e = window.event;
		var _target = (e.target || e.srcElement);
		if(isElementBefore(_target,'selectArea') == 0 && isElementBefore(_target,'optionsDiv') == 0)
		{
			active_select.className = active_select.className.replace('optionsDivVisible', '');
			active_select.className = active_select.className.replace('optionsDivInvisible', '');
			active_select.className += " optionsDivInvisible";
			_active.className = _active.className.replace('selectAreaActive','');
			active_select = false;

			if(document.documentElement)
			{
				document.documentElement.onclick = function(){};
			}
			else
			{
				window.onclick = null;
			}
		}
	}
}

function isElementBefore(_el,_class)
{
	var _parent = _el;	
	do
	{
		_parent = _parent.parentNode;
	}
	while(_parent && _parent.className != null && _parent.className.indexOf(_class) == -1)
	
	if(_parent.className && _parent.className.indexOf(_class) != -1)
	{
		return 1;
	}
	else
	{
		return 0;
	}
	
}

function findPosY(obj) {
	var posTop = 0;
	while (obj.offsetParent) {posTop += obj.offsetTop; obj = obj.offsetParent;}
	return posTop;
}
function findPosX(obj) {
	var posLeft = 0;
	while (obj.offsetParent) {posLeft += obj.offsetLeft; obj = obj.offsetParent;}
	return posLeft;
}

/*Scroll bar*/
var VSA_scrollAreas = new Array();

var VSA_default_imagesPath = "images";
var VSA_default_btnUpImage = "button-up.gif";
var VSA_default_btnDownImage = "button-down.gif";
var VSA_default_scrollStep = 5;
var VSA_default_wheelSensitivity = 10;
var VSA_default_scrollbarPosition = 'right';//'left','right','inline';
var VSA_default_scrollButtonHeight = 18;
var VSA_default_scrollbarWidth = 20;

var VSA_resizeTimer = 2000;

function VSA_initScrollbars()
{
	var scrollElements = VSA_getElements("scrollable", "DIV", document, "class");
	for (var i=0; i<scrollElements.length; i++)
	{
		VSA_scrollAreas[i] = new ScrollArea(i, scrollElements[i]);
	}
}

function ScrollArea(index, elem) //constructor
{
	this.index = index;
	this.element = elem;

	var attr = this.element.getAttribute("imagesPath");
	this.imagesPath = attr ? attr : VSA_default_imagesPath;

	attr = this.element.getAttribute("btnUpImage");
	this.btnUpImage = attr ? attr : VSA_default_btnUpImage;

	attr = this.element.getAttribute("btnDownImage");
	this.btnDownImage = attr ? attr : VSA_default_btnDownImage;

	attr = Number(this.element.getAttribute("scrollStep"));
	this.scrollStep = attr ? attr : VSA_default_scrollStep;

	attr = Number(this.element.getAttribute("wheelSensitivity"));
	this.wheelSensitivity = attr ? attr : VSA_default_wheelSensitivity;

	attr = this.element.getAttribute("scrollbarPosition");
	this.scrollbarPosition = attr ? attr : VSA_default_scrollbarPosition;
	
	attr = this.element.getAttribute("scrollButtonHeight");
	this.scrollButtonHeight = attr ? attr : VSA_default_scrollButtonHeight;

	attr = this.element.getAttribute("scrollbarWidth");
	this.scrollbarWidth = attr ? attr : VSA_default_scrollbarWidth;

	this.scrolling = false;

	this.iOffsetY = 0;
	this.scrollHeight = 0;
	this.scrollContent = null;
	this.scrollbar = null;
	this.scrollup = null;
	this.scrolldown = null;
	this.scrollslider = null;
	this.scroll = null;
	this.enableScrollbar = false;
	this.scrollFactor = 1;
	this.scrollingLimit = 0;
	this.topPosition = 0;

	//functions declaration
	this.init = VSA_init;
	this.scrollUp = VSA_scrollUp;
	this.scrollDown = VSA_scrollDown;
	this.createScrollBar = VSA_createScrollBar;
	this.scrollIt = VSA_scrollIt;

	this.init();
}


function VSA_init() {
	this.scrollContent = document.createElement("DIV");
	this.scrollContent.style.position = "absolute";
	this.scrollContent.style.overflow = "hidden";
	this.scrollContent.style.width = this.element.offsetWidth + "px";
	this.scrollContent.style.height = this.element.offsetHeight + "px";

	while(this.element.children.length) this.scrollContent.appendChild(this.element.children[0]);

	this.element.style.overflow = "hidden";
	this.element.style.display = "block";
	this.element.style.visibility = "visible";
	this.element.style.position = "relative";
	this.element.appendChild(this.scrollContent);

	this.scrollContent.className = 'scroll-content';

	this.element.index = this.index;
	this.element.over = false;
	
	var _this = this;
	this.element.onmouseover = function(){
		_this.element.over = true;
	};
	this.element.onmouseout = function(){
		_this.element.over = false;
	}

	if (document.all)
	{
		this.element.onscroll = VSA_handleOnScroll;
		this.element.onresize = VSA_handleResize;
	}
	else
	{
		window.onresize = VSA_handleResize;
	}
	
	this.createScrollBar();
	
	if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        this.element.addEventListener('DOMMouseScroll', VSA_handleMouseWheel, false);
	/** IE/Opera. */
	this.element.onmousewheel = document.onmousewheel = VSA_handleMouseWheel;

}

function VSA_createScrollBar()
{

	if (this.scrollbar != null)
	{
		this.element.removeChild(this.scrollbar);
		this.scrollbar = null;
	}

	if (this.scrollContent.scrollHeight <= this.scrollContent.offsetHeight)
		this.enableScrollbar = false;
	else if (this.element.offsetHeight > 2*this.scrollButtonHeight)
		this.enableScrollbar = true;
	else
		this.enableScrollbar = false;

	if (this.scrollContent.scrollHeight - Math.abs(this.scrollContent.scrollTop) < this.element.offsetHeight)
		this.scrollContent.style.top = 0;

	if (this.enableScrollbar)
	{

		this.scrollbar = document.createElement("DIV");
		this.element.appendChild(this.scrollbar);		
		this.scrollbar.style.position = "absolute";
		this.scrollbar.style.top = "0px";
		this.scrollbar.style.height = this.element.offsetHeight+"px";
		this.scrollbar.style.width = this.scrollbarWidth + "px";

		this.scrollbar.className = 'vscroll-bar';

		if(this.scrollbarWidth != this.scrollbar.offsetWidth)
		{
			this.scrollbarWidth = this.scrollbar.offsetHeight;
		}
		
		this.scrollbarWidth = this.scrollbar.offsetWidth;

		if(this.scrollbarPosition == 'left')
		{
			this.scrollContent.style.left = this.scrollbarWidth + 5 + "px";			
			this.scrollContent.style.width = this.element.offsetWidth - this.scrollbarWidth - 5 + "px";			
		}
		else if(this.scrollbarPosition == 'right')
		{
			this.scrollbar.style.left = this.element.offsetWidth - this.scrollbarWidth  + "px";
			this.scrollContent.style.width = this.element.offsetWidth - this.scrollbarWidth - 5 + "px";			
		}

		//create scroll up button
		this.scrollup = document.createElement("DIV");
		this.scrollup.index = this.index;
		this.scrollup.onmousedown = VSA_handleBtnUpMouseDown;
		this.scrollup.onmouseup = VSA_handleBtnUpMouseUp;
		this.scrollup.onmouseout = VSA_handleBtnUpMouseOut;
		this.scrollup.style.position = "absolute";
		this.scrollup.style.top = "0px";
		this.scrollup.style.left = "0px";		
		this.scrollup.style.height = this.scrollButtonHeight + "px";		
		this.scrollup.style.width = this.scrollbarWidth + "px";
		
		this.scrollup.innerHTML = '<img src="' + this.imagesPath + '/' + this.btnUpImage + '" border="0"/>';
		this.scrollbar.appendChild(this.scrollup);

		this.scrollup.className = 'vscroll-up';

		if(this.scrollButtonHeight != this.scrollup.offsetHeight)
		{
			this.scrollButtonHeight = this.scrollup.offsetHeight;
		}
				
		//create scroll down button
		this.scrolldown = document.createElement("DIV");
		this.scrolldown.index = this.index;
		this.scrolldown.onmousedown = VSA_handleBtnDownMouseDown;
		this.scrolldown.onmouseup = VSA_handleBtnDownMouseUp;
		this.scrolldown.onmouseout = VSA_handleBtnDownMouseOut;
		this.scrolldown.style.position = "absolute";
		this.scrolldown.style.left = "0px";		
		this.scrolldown.style.top =  this.scrollbar.offsetHeight - this.scrollButtonHeight + "px";
		this.scrolldown.style.width = this.scrollbarWidth + "px";
		this.scrolldown.innerHTML = '<img src="' + this.imagesPath + '/' + this.btnDownImage + '" border="0"/>';
		this.scrollbar.appendChild(this.scrolldown);

		this.scrolldown.className = 'vscroll-down';

		//create scroll
		this.scroll = document.createElement("DIV");
		this.scroll.index = this.index;
		this.scroll.style.position = "absolute";
		this.scroll.style.zIndex = 0;
		this.scroll.style.textAlign = "center";
		this.scroll.style.top = this.scrollButtonHeight + "px";
		this.scroll.style.left = "0px";		
		this.scroll.style.width = this.scrollbarWidth + "px";
		
		var h = this.scrollbar.offsetHeight - 2*this.scrollButtonHeight;
		this.scroll.style.height = ((h > 0) ? h : 0) + "px";
		
		this.scroll.innerHTML = '';
		this.scroll.onclick = VSA_handleScrollbarClick;
		this.scrollbar.appendChild(this.scroll);
		this.scroll.style.overflow = "hidden";

		this.scroll.className = "vscroll-line";

		//create slider
		this.scrollslider = document.createElement("DIV");
		this.scrollslider.index = this.index;
		this.scrollslider.style.position = "absolute";
		this.scrollslider.style.zIndex = 1000;
		this.scrollslider.style.textAlign = "center";
		this.scrollslider.innerHTML = '<div id="scrollslider' + this.index + '" style="padding:0;margin:0;"><div class="scroll-bar-top"></div><div class="scroll-bar-bottom"></div></div>';
		this.scrollbar.appendChild(this.scrollslider);
		
		this.subscrollslider = document.getElementById("scrollslider"+this.index);		
		this.subscrollslider.style.height = Math.round((this.scrollContent.offsetHeight/this.scrollContent.scrollHeight)*(this.scrollbar.offsetHeight - 2*this.scrollButtonHeight)) + "px";
		
		this.scrollslider.className = "vscroll-slider";
		
		this.scrollHeight = this.scrollbar.offsetHeight - 2*this.scrollButtonHeight - this.scrollslider.offsetHeight;
		this.scrollFactor = (this.scrollContent.scrollHeight - this.scrollContent.offsetHeight)/this.scrollHeight;
		this.topPosition = getRealTop(this.scrollbar) + this.scrollButtonHeight;
		/* this.scrollbarHeight = this.scrollbar.offsetHeight - 2*this.scrollButtonHeight - this.scrollslider.offsetHeight; */

		this.scrollslider.style.top = /* 1 / this.scrollFactor * Math.abs(this.scrollContent.offsetTop) +*/ this.scrollButtonHeight + "px";
		this.scrollslider.style.left = "0px";
		this.scrollslider.style.width = "100%";
		this.scrollslider.onmousedown = VSA_handleSliderMouseDown;
		if (document.all)
			this.scrollslider.onmouseup = VSA_handleSliderMouseUp;
	}
	else
		this.scrollContent.style.width = this.element.offsetWidth + "px";
}

function VSA_handleBtnUpMouseDown()
{
	var sa = VSA_scrollAreas[this.index];
	sa.scrolling = true;
	sa.scrollUp();
}

function VSA_handleBtnUpMouseUp()
{
	VSA_scrollAreas[this.index].scrolling = false;
}

function VSA_handleBtnUpMouseOut()
{
	VSA_scrollAreas[this.index].scrolling = false;
}

function VSA_handleBtnDownMouseDown()
{
	var sa = VSA_scrollAreas[this.index];
	sa.scrolling = true;
	sa.scrollDown();
}

function VSA_handleBtnDownMouseUp()
{
	VSA_scrollAreas[this.index].scrolling = false;
}

function VSA_handleBtnDownMouseOut()
{
	VSA_scrollAreas[this.index].scrolling = false;
}

function VSA_scrollIt()
{
	this.scrollContent.scrollTop = this.scrollFactor * ((this.scrollslider.offsetTop + this.scrollslider.offsetHeight/2) - this.scrollButtonHeight - this.scrollslider.offsetHeight/2);
}

function VSA_scrollUp()
{
	if (this.scrollingLimit > 0)
	{
		this.scrollingLimit--;
		if (this.scrollingLimit == 0) this.scrolling = false;
	}
	if (!this.scrolling) return;
	if ( this.scrollContent.scrollTop - this.scrollStep > 0)
	{
		this.scrollContent.scrollTop -= this.scrollStep;
		this.scrollslider.style.top = 1 / this.scrollFactor * Math.abs(this.scrollContent.scrollTop) + this.scrollButtonHeight + "px";
	}
	else
	{
		this.scrollContent.scrollTop = "0";
		this.scrollslider.style.top = this.scrollButtonHeight + "px";
		return;
	}
	setTimeout("VSA_Ext_scrollUp(" + this.index + ")", 30);
}

function VSA_Ext_scrollUp(index)
{
	VSA_scrollAreas[index].scrollUp();
}

function VSA_scrollDown()
{
	if (this.scrollingLimit > 0)
	{
		this.scrollingLimit--;
		if (this.scrollingLimit == 0) this.scrolling = false;
	}
	if (!this.scrolling) return;


	this.scrollContent.scrollTop += this.scrollStep;
	this.scrollslider.style.top =  1 / this.scrollFactor * Math.abs(this.scrollContent.scrollTop) + this.scrollButtonHeight + "px";

	if (this.scrollContent.scrollTop >= (this.scrollContent.scrollHeight - this.scrollContent.offsetHeight))
	{
		this.scrollContent.scrollTop = (this.scrollContent.scrollHeight - this.scrollContent.offsetHeight);
		this.scrollslider.style.top = this.scrollbar.offsetHeight - this.scrollButtonHeight - this.scrollslider.offsetHeight + "px";
		return;
	}

	setTimeout("VSA_Ext_scrollDown(" + this.index + ")", 30);
}

function VSA_Ext_scrollDown(index)
{
	VSA_scrollAreas[index].scrollDown();
}

function VSA_handleMouseMove(evt)
{
	var sa = VSA_scrollAreas[((document.all && !window.opera) ? this.index : document.documentElement.scrollAreaIndex)];
	var posy = 0;
	if (!evt) var evt = window.event;
	
	if (evt.pageY)
		posy = evt.pageY;
	else if (evt.clientY)
		posy = evt.clientY;
			
		if (document.all && !window.opera)
		{
			posy += document.documentElement.scrollTop;
		}

	var iNewY = posy - sa.iOffsetY - getRealTop(sa.scrollbar) - sa.scrollButtonHeight;
		iNewY += sa.scrollButtonHeight;
		
	if (iNewY < sa.scrollButtonHeight)
		iNewY = sa.scrollButtonHeight;
	if (iNewY > (sa.scrollbar.offsetHeight - sa.scrollButtonHeight) - sa.scrollslider.offsetHeight)
		iNewY = (sa.scrollbar.offsetHeight - sa.scrollButtonHeight) - sa.scrollslider.offsetHeight;

	sa.scrollslider.style.top = iNewY + "px";

	sa.scrollIt();
}

function VSA_handleSliderMouseDown(evt)
{
	if (!(document.uniqueID && document.compatMode && !window.XMLHttpRequest))
	{
		document.onselectstart = function() { return false; }
		document.onmousedown = function() { return false; }
	}

	var sa = VSA_scrollAreas[this.index];
	if (document.all && !window.opera)
	{
		sa.scrollslider.setCapture()
		sa.iOffsetY = event.offsetY;
		sa.scrollslider.onmousemove = VSA_handleMouseMove;
	}
	else
	{
		if(window.opera)
		{
			sa.iOffsetY = event.offsetY;
		}
		else
		{
			sa.iOffsetY = evt.layerY;
		}
		document.documentElement.scrollAreaIndex = sa.index;
		document.documentElement.addEventListener("mousemove", VSA_handleMouseMove, true);
		document.documentElement.addEventListener("mouseup", VSA_handleSliderMouseUp, true);
	}
	return false;
}

function VSA_handleSliderMouseUp()
{
	if (!(document.uniqueID && document.compatMode && !window.XMLHttpRequest))
	{
		document.onmousedown = null;
		document.onselectstart = null;
	}

	if (document.all && !window.opera)
	{
		var sa = VSA_scrollAreas[this.index];
		sa.scrollslider.onmousemove = null;
		sa.scrollslider.releaseCapture();
		sa.scrollIt();
	}
	else
	{
		var sa = VSA_scrollAreas[document.documentElement.scrollAreaIndex];
		document.documentElement.removeEventListener("mousemove", VSA_handleMouseMove, true);
		document.documentElement.removeEventListener("mouseup", VSA_handleSliderMouseUp, true);
		sa.scrollIt();
	}
	return false;
}

function VSA_handleResize()
{
	if (VSA_resizeTimer)
	{
		clearTimeout(VSA_resizeTimer);
		VSA_resizeTimer = 0;
	}
	VSA_resizeTimer = setTimeout("VSA_performResizeEvent()", 100);
}

function VSA_performResizeEvent()
{
	for (var i=0; i<VSA_scrollAreas.length; i++)
		VSA_scrollAreas[i].createScrollBar();
}
function VSA_handleMouseWheel(event){
	if (this.index != null) {
		var sa = VSA_scrollAreas[this.index];
		
		if (sa.scrollbar == null) return;
		sa.scrolling = true;
		sa.scrollingLimit = sa.wheelSensitivity;
		
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
                 
                /*if (window.opera)
                        delta = -delta;*/
        } else if (event.detail) { /** Mozilla case. */
                delta = -event.detail/3;
        }
        if (delta && sa.element.over) {
                if (delta > 0)
			        sa.scrollUp();
				else
			        sa.scrollDown();
				
                if (event.preventDefault)
                        event.preventDefault();
                event.returnValue = false;
        }
	}
}

function VSA_handleSelectStart()
{
	event.returnValue = false;
}

function VSA_handleScrollbarClick(evt)
{
	var sa = VSA_scrollAreas[this.index];
	var offsetY = (document.all ? event.offsetY : evt.layerY);

	if (offsetY < (sa.scrollButtonHeight + sa.scrollslider.offsetHeight/2))
		sa.scrollslider.style.top = sa.scrollButtonHeight + "px";
	else if (offsetY > (sa.scrollbar.offsetHeight - sa.scrollButtonHeight - sa.scrollslider.offsetHeight))
		sa.scrollslider.style.top = sa.scrollbar.offsetHeight - sa.scrollButtonHeight - sa.scrollslider.offsetHeight + "px";
	else
	{
		sa.scrollslider.style.top = offsetY + sa.scrollButtonHeight - sa.scrollslider.offsetHeight/2 + "px";
	}
	sa.scrollIt();
}

function VSA_handleOnScroll()
{
	//event.srcElement.doScroll("pageUp");
}

//--- common functions ----

function VSA_getElements(attrValue, tagName, ownerNode, attrName) //get Elements By Attribute Name
{
	if (!tagName) tagName = "*";
	if (!ownerNode) ownerNode = document;
	if (!attrName) attrName = "name";
	var result = [];
	var nl = ownerNode.getElementsByTagName(tagName);
	for (var i=0; i<nl.length; i++)
	{
	//	if (nl.item(i).getAttribute(attrName) == attrValue)
//		result.push(nl.item(i));
		if (nl.item(i).className.indexOf(attrValue) != -1)
		result.push(nl.item(i));
	}
	return result;
}



function getRealTop(obj) {
	var posTop = 0;
	while (obj.offsetParent) {
		posTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return posTop;
}
/*End scrollbar*/

if (window.addEventListener)
	window.addEventListener("load", initPage, false);
else if (window.attachEvent)
	window.attachEvent("onload", initPage);
Drupal.behaviors.customInitPage = function(context) {
	initPage();
}