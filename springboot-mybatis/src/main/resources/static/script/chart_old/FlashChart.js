/**
*	encapsulate flushionchart
*/
FlashChart = function(type, renderId, width, height, multi){
	this.resourceHome = "";
	this.caption = "";
	this.subCaption = "";

	this.categories = [];
	this.datasets = null;
	this.chartId = "chartId_"+FlashChart.count++;

	this.renderId = renderId;
	this.chartType = type;
	
	this.xAxisName = "";
	this.yAxisName = "";
	this.width = width;
	this.height = height;

	this.multidimensional = multi;
	this.showValue = '0';
}

FlashChart.count = 0;
window.FlashChart = FlashChart;

/**
*	init resource home
*/
FlashChart.prototype.setResourceHome = function(resourceHome){
	this.resourceHome = resourceHome;
}

/**
*	set caption and subCaption
*/
FlashChart.prototype.setCaption = function(caption, subCaption){
	if(caption) this.caption = caption;
	if(subCaption) this.subCaption = subCaption;
}

FlashChart.prototype.setAxisName = function(xAxisName, yAxisName){
	this.xAxisName = xAxisName;
	this.yAxisName = yAxisName;
}

/**
*	whether show value
**/
FlashChart.prototype.setShowValue = function(showValue){
	this.showValue = showValue;
}

/**
*  set categories
*/
FlashChart.prototype.setCategories = function(categories){
	this.categories = categories;
}

/**
*	set datasets
*/
FlashChart.prototype.setDatasets = function(datasets){
	this.datasets = datasets;
}

/**
*	generate and show chart
*/
FlashChart.prototype.show = function(sTy){
	if(!this.chartType || '123'.indexOf(this.chartType) == -1){
		alert("set chart type[1..3], please!");
		return;
	}

	var swf = '';
	var data = null;
	switch(this.chartType){
		case '1':
			swf = this.multidimensional ? 'MSLine.swf' : 'Line.swf';
			data = this.getMSLineChartData();
			break;
		case '2':
			swf = this.multidimensional ? 'MSColumn3D.swf' : 'Column3D.swf';
			data = this.getMSBarChartData();
			break;
		case '3':
			swf = 'Pie3D.swf';
			data = this.getPieChartData(sTy);
			break;
		default:
			break;
	}
	
	if(!swf) return;
	if(!this.resourceHome){
		alert(" not set resource home!");
		return;
	}
	
	if(!this.width) this.width = '100%';
	if(!this.height) this.height = '100%';

	var chart = new FusionCharts(this.resourceHome+"/"+swf, this.chartId, this.width, this.height, "0", "1"); 
	
	chart.setDataXML( data );
	chart.setTransparent(true);
	chart.render(this.renderId);
}

/**
*	destroy shown chart
*/
FlashChart.prototype.destroy = function(){
	document.getElementById(this.renderId).innerHTML = "";
}

/**
*	print chart
*/
FlashChart.prototype.print = function(){
	if(!this.chartId){
		alert("can't find chartid!");
		return;
	}
	var chart = getChartFromId(this.chartId);
	chart.print();
}

/**
*	MSLine Chart Data
*/
FlashChart.prototype.getMSLineChartData = function(){
	if(!this.categories || !isArray(this.categories)){
		alert("no set categories!");
		return "";
	}

	if(!this.datasets || !isArray(this.datasets)){
		alert("no set datasets!");
		return "";
	}

	var data = new StringBuffer();
	data.append("<chart palette='3' caption='" + this.caption + "' ");
	if(this.subCaption){
		data.append(" subcaption='"+this.subCaption+"' ");	
	}

	data.append(" showAboutMenuItem='0' formatNumberScale='0' bgAlpha='10,10' numVDivLines='10' ")
      .append(" showValues='0' anchorRadius='4' divLineIsDashed='1' baseFontSize ='12' ")
		  .append(" baseFontColor ='000000' xAxisName='"+this.xAxisName+"' yAxisName='"+this.yAxisName+"' ")
		  .append(" rotateYAxisName='0' yAxisNameWidth='20' showAlternateVGridColor='0' ")
		  .append(" canvasBorderThickness='1' lineThickness='2' showBorder='0'>");

	//categories
	for(var i=0; i<this.categories.length; i++){
		if(i == 0){
			data.append('<categories>');
		}
		
		data.append('<category label="' + this.categories[i] + '"/>');

		if(i == this.categories.length-1){
			data.append('</categories>');
		}
	}
	
	//dataset
	for(var j=0; j<this.datasets.length; j++){
		var dataSet = this.datasets[j];
		data.append('<dataset seriesName="'+ dataSet.mc +'" >');
		
		for(var k=0; k<dataSet.val.length; k++){
			data.append('<set value="'+ dataSet.val[k] +'"/>');
		}

		data.append('</dataset>');
	}

	data.append( getCaptionStyle() )
		.append( getAxisTitlesFont() )
		.append( getDataLabelFont() )
		.append( getYaxisValueStyle() )
		.append( getToolTipStyle() )
		.append( getAnchorsStyle() )
		.append('</chart>');
	
	return data.toString();	
}

/**
*	MSBar chart data
**/
FlashChart.prototype.getMSBarChartData = function(){
	if(!this.categories || !isArray(this.categories)){
		alert("no set categories!");
		return "";
	}
	if(!this.datasets || !isArray(this.datasets)){
		alert("no set datasets!");
		return "";
	}

	var data = new StringBuffer();
	
	data.append("<chart caption='"+ this.caption +"' ");
	if(this.subCaption){
		data.append(" subcaption='"+this.subCaption+"' ");	
	}
	if(this.showValue == '1'){
		data.append(" showValues='1' ");
	}else{
		data.append(" showValues='0' ");
	}

  /*
	data.append(" xAxisName='" + this.xAxisName + "' yAxisName='" + this.yAxisName + "' formatNumberScale='0'")
		.append(" rotateYAxisName='0' yAxisNameWidth='20' ")
		.append(" baseFontSize ='12' baseFontColor ='000000' showAboutMenuItem='0'>");
	*/

	data.append(" showAboutMenuItem='0' formatNumberScale='0' ")
      .append(" baseFontSize ='12' ")
		  .append(" baseFontColor ='000000' xAxisName='" + this.xAxisName + "' yAxisName='" + this.yAxisName + "' ")
		  .append(" rotateYAxisName='0' yAxisNameWidth='20' >");

	//categories
	for(var i=0; i<this.categories.length; i++){
		if(i == 0){
			data.append('<categories>');
		}
		
		data.append('<category label="' + this.categories[i] + '"/>');

		if(i == this.categories.length-1){
			data.append('</categories>');
		}
	}	
	
	//dataset
	for(var j=0; j<this.datasets.length; j++){
		var dataSet = this.datasets[j];
		data.append('<dataset seriesName="'+ dataSet.mc +'" >');
		
		for(var k=0; k<dataSet.val.length; k++){
			data.append('<set value="'+ dataSet.val[k] +'"/>');
		}

		data.append('</dataset>');
	}
	
	data.append( getCaptionStyle() ).append( getToolTipStyle() ).append( getDataValuesStyle() );
	//data.append("</chart>");
	
	data.append( getCaptionStyle() )
		.append( getAxisTitlesFont() )
		.append( getDataLabelFont() )
		.append( getYaxisValueStyle() )
		.append( getToolTipStyle() )
		.append( getAnchorsStyle() )
		.append('</chart>');

	return data.toString();	
}

/**
*	Pie Chart data
**/
FlashChart.prototype.getPieChartData = function(sTy){
	if(!this.datasets || !isArray(this.datasets)){
		alert("no set datasets!");
		return "";
	}

  if (typeof sTy == "undefined" || sTy == null || sTy == ""){
    sTy = "0";
  }
	
	var data = new StringBuffer();
	
	data.append("<chart palette='3' caption='"+ this.caption +"' ");
	if(this.subCaption){
		data.append(" subcaption='"+ this.subCaption +"'")
	}

  // showPercentageValues：1－显示百分比、0－显示值
	//data.append(" baseFontSize ='12' baseFontColor ='000000' showAboutMenuItem='0' showPercentageValues='0' formatNumberScale='0'>");
	data.append(" baseFontSize ='12' baseFontColor ='000000' showAboutMenuItem='0' showPercentageValues='" + sTy + "' formatNumberScale='0'>");
	
	for(var i=0; i<this.datasets.length; i++){
		
		data.append("<set label='"+ this.datasets[i].mc +"' value='"+ this.datasets[i].val +"' isSliced='1'/>");
		
	}

	data.append( getCaptionStyle() ).append( getToolTipStyle() );
	data.append("</chart>");
	
	return data.toString();
}

function isArray(obj){ 
	return Object.prototype.toString.call(obj) === '[object Array]'; 
} 

// 柱图：显示值属性
function getDataValuesStyle(){
	
	var style = new StringBuffer();
	
	style.append('<styles>')
		.append('<definition>')
		.append("<style name='dataValuesFont' type='font' size='10' color='000000' bold='1'/>")
		.append('</definition>')
		.append('<application>')
		.append("<apply toObject='DataValues' styles='dataValuesFont'/>")
		.append('</application>')
		.append('</styles>');
	
	return style.toString();
	
}

// 图表标题属性
function getCaptionStyle(){
	var style = new StringBuffer();
	style.append("<styles>")
	.append("<definition>")
	.append('<style name="CaptionFont" type="font" size="14"/>')
	.append('</definition>')
	.append('<application>')
	.append('<apply toObject="CAPTION" styles="CaptionFont"/>')
	.append('<apply toObject="SUBCAPTION" styles="CaptionFont"/>')
	.append('</application>')
	.append('</styles>');
	
	return style.toString();
}

// 线图：XY轴标签属性
function getAxisTitlesFont(){
	var style = new StringBuffer();
	style.append("<styles>")
	.append("<definition>")
	.append("<style name='axisTitlesFont' type='font' font='Arial' size='12' bold='1'/>")
	.append("</definition>")
	.append("<application>")
	.append("<apply toObject='XAxisName' styles='axisTitlesFont'/>")
	.append("<apply toObject='YAxisName' styles='axisTitlesFont'/>")
	.append("</application>")
	.append("</styles>");
	
	return style.toString();
}

// 线图：X轴刻度属性
function getDataLabelFont(){
	var style = new StringBuffer();
	style.append("<styles>")
	.append("<definition>")
	//.append("<style name='labelsFont' type='font' font='Arial' size='11' color='000000' bold='1' underline='0'/>")	
	.append("<style name='labelsFont' type='font' font='Arial' size='12' color='000000' bold='0' underline='0'/>")	
	.append("</definition>")
	.append("<application>")
	.append("<apply toObject='DataLabels' styles='labelsFont'/>")
	.append("</application>")
	.append("</styles>");	
	
	return style.toString();
}

// 线图：Y轴刻度属性
function getYaxisValueStyle(){
	var style = new StringBuffer();
	style.append("<styles>")
	.append("<definition>")
	//.append("<style name='yValuesFont' type='font' font='Arial' size='11' color='000000' bold='1'/>")
	.append("<style name='yValuesFont' type='font' font='Arial' size='12' color='000000' bold='0'/>")
	.append("</definition>")
	.append("<application>")
	.append("<apply toObject='YAXISVALUES' styles='yValuesFont'/>")
	.append("</application>")
	.append("</styles>");	
	
	return style.toString();		
}

// 鼠标移动到图中的显示属性
function getToolTipStyle(){
	
	var style = new StringBuffer();
	style.append("<styles>")
	.append("<definition><style name='toolTipFont' type='font' font='Arial' size='12' color='FF5904'/></definition>")
	.append("<application><apply toObject='ToolTip' styles='toolTipFont' />   </application>")
	.append("</styles>");
	
	return style.toString();
}

function getAnchorsStyle(){
	
	var style = new StringBuffer();
	style.append("<styles>")
		.append("<definition>")
		.append("<style name='anchorsAnim' type='animation' param='_y' start='0' easing='Bounce' duration='1'/>")
		.append("</definition>")
		.append("<application>")
		.append("<apply toObject='ANCHORS' styles='anchorsAnim'/>")
		.append("</application>")
		.append("</styles>");
	
	return style.toString();
}

function  StringBuffer (s){
	/**
	 * @private
	 */
	var strs = [];
	var str = null;
	var curr = 0;

	/**
	 * Appends the string to this string buffer. 
	 * @param {String} s a string
	 * @return  a reference to this <code>StringBuffer</code>.
	 * @type StringBuffer
	 */
	this.append = function(s)
	{
		strs[curr++] = (s == null) ? 
			"" : s.toString();
		str = null;
		return this;
	}

	/**
	 * Inserts the string representation of a subarray of the <code>str</code>
	 * @param {int} index position at which to insert subarray.
	 * @param {String} s a string.
	 * @return  This string buffer.
	 * @type StringBuffer
	 */
	this.insert = function(index, s)
	{
		var v = this.toString();
		str = v.substring(0, index) 
			+ s + v.substring(index);
		strs = [str];
		curr = 1;
		return this;
	}

	/**
	 * Returns the index within this string of the first occurrence of the
	 * specified substring.
	 * @param {String} s any string.
	 * @return  if the string argument occurs as a substring within this
	 * 	        object, then the index of the first character of the first
	 *          such substring is returned;
	 * @type int
	 */
	this.indexOf = function (s)
	{
		return this.toString().indexOf(s);
	}
	
	/**
	 * Returns the index within this string of the rightmost occurrence
	 * of the specified substring.
	 * @param {String} s any string.
	 * @return  if the string argument occurs one or more times as a substring
	 *          within this object, then the index of the first character of
	 *          the last such substring is returned. If it does not occur as
	 *          a substring, <code>-1</code> is returned.
	 * @type int
	 */
	this.lastIndexOf = function (s)
	{
		return this.toString().lastIndexOf(s);
	}
	
	/**
	 * Returns a new String that contains a subsequence of
	 * characters currently contained in this <code>StringBuffer</code>.The 
	 * substring begins at the specified index and extends to the end of the
	 * <code>StringBuffer</code>.
	 * @param  start The beginning index, inclusive.
	 * @return The new string.
	 * @type int
	 */
	this.substring = function (st, ed)
	{
		return (ed) ? this.toString().substring(st)
			: this.toString().substring(st, ed);
	}

	/**
	 * Converts to a string representing the data in this string buffer.
	 * A new String object is allocated and initialized to 
	 * contain the character sequence currently represented by this 
	 * string buffer. This String is then returned. Subsequent 
	 * changes to the string buffer do not affect the contents of the String.
	 * @return  a string representation of the string buffer.
	 * @type String
	 */
	this.toString = function()
	{
		if (str == null)
		{
			str = strs.join("");
			strs = [str];
			curr = 1;
		}
		return str;
	}

	/**
	 * Returns the length (character count) of this string buffer.
	 * @return  the length of the sequence of characters currently 
	 *          represented by this string buffer.
	 * @type int
	 */
	this.length = function()
	{
		return this.toString().length;
	}

	/**
	 * Sets the length of this String buffer.
	 * @param l the new length of the buffer.
	 * @see #length()
	 */
	this.setLength = function(l)
	{
		l = (l < 0) ? 0 : l;
		l = (l > this.length()) ? this.length() : l;
		str = str.substring(0, l);
		strs = new Array(str);
		curr = 1;
	}
	
	/**
	 * First thing---append the argument
	 * @ignore
	 */
	if (s != null)
	{
		this.append(s);
	}

}
