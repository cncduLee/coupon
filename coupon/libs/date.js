exports.genTime = {
	/**
	 * 字符串转时间
	 * @param: datestr 	格式：'YYYY-MM-DD HH:MM:SS '
	 */
	str2date : function( datestr ) {
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
		var r = datestr.match(reg);
	    if(r==null)return null; 
	    return new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	},

	/**
	 * 时间戳转时间
	 * @param: timestamp 时间戳
	 */
	timestamp2date : function( timestamp ) {
	  return new Date( timestamp * 1000 );
	},


	/**
	 * 时间转时间戳
	 * @param: date 时间戳
	 */
	date2timestamp : function( date ) {
	  return Math.floor( date.getTime() / 1000 );
	},

	/**
	 * 当前时间转时间戳
	 * @param: date 时间戳
	 */
	now2timestamp : function( ) {
	  return date2timestamp( new Date() );
	},

	/**
	 * 时间转时间戳
	 * @param: datestr 时间字符串
	 */
	 str2timestamp : function( datestr ) {
	  return date2timestamp(str2date(timestr));
	}

};
 