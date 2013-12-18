var B64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=this._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=this._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}};
/**
 * Base namespace of all Visiware projects
 */
var visiware = visiware || {};


/**
 * From https://gist.github.com/1376471
 *
 * @param {Object} ns Namespace to extend
 * @param {String} ns_string Sub namespace
 */
function extend( ns, ns_string ) {

    var parts = ns_string.split("."),
        parent = ns,
        pl;

    pl = parts.length;

    for ( var i = 0; i < pl; i++ ) {
        // create a property if it doesn't exist
        if ( typeof parent[parts[i]] === "undefined" ) {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
}
﻿
(function($){var o=$({});$.subscribe=function(){o.bind.apply(o,arguments);};$.unsubscribe=function(){o.unbind.apply(o,arguments);};$.publish=function(){o.trigger.apply(o,arguments);};})(jQuery);
"use strict";jQuery.base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));
/*
 Javascript MD5 library - version 0.4

 Coded (2011) by Luigi Galli - LG@4e71.org - http://faultylabs.com

 Thanks to: Roberto Viola

 The below code is PUBLIC DOMAIN - NO WARRANTY!

 Changelog:
            Version 0.4   - 2011-06-19
            + added compact version (md5_compact_min.js), this is a slower but smaller version
              (more than 4KB lighter before stripping/minification)
            + added preliminary support for Typed Arrays (see:
              https://developer.mozilla.org/en/JavaScript_typed_arrays and
              http://www.khronos.org/registry/typedarray/specs/latest/)
              MD5() now accepts input data as ArrayBuffer, Float32Array, Float64Array,
              Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array or Uint8Array
            - moved unit tests to md5_test.js
            - minor refactoring

            Version 0.3.* - 2011-06-##
            - Internal dev versions

            Version 0.2 - 2011-05-22
            ** FIXED: serious integer overflow problems which could cause a wrong MD5 hash being returned

            Version 0.1 - 2011
            -Initial version
*/

if (typeof faultylabs == 'undefined') {
    faultylabs = {}
}

/*
   MD5()

    Computes the MD5 hash for the given input data

    input :  data as String - (Assumes Unicode code points are encoded as UTF-8. If you
                               attempt to digest Unicode strings using other encodings
                               you will get incorrect results!)

             data as array of characters - (Assumes Unicode code points are encoded as UTF-8. If you
                              attempt to digest Unicode strings using other encodings
                              you will get incorrect results!)

             data as array of bytes (plain javascript array of integer numbers)

             data as ArrayBuffer (see: https://developer.mozilla.org/en/JavaScript_typed_arrays)

             data as Float32Array, Float64Array, Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array or Uint8Array (see: https://developer.mozilla.org/en/JavaScript_typed_arrays)

             (DataView is not supported yet)

   output: MD5 hash (as Hex Uppercase String)
*/

faultylabs.MD5 = function(data) {

    // convert number to (unsigned) 32 bit hex, zero filled string
    function to_zerofilled_hex(n) {
        var t1 = (n >>> 0).toString(16)
        return "00000000".substr(0, 8 - t1.length) + t1
    }

    // convert array of chars to array of bytes
    function chars_to_bytes(ac) {
        var retval = []
        for (var i = 0; i < ac.length; i++) {
            retval = retval.concat(str_to_bytes(ac[i]))
        }
        return retval
    }


    // convert a 64 bit unsigned number to array of bytes. Little endian
    function int64_to_bytes(num) {
        var retval = []
        for (var i = 0; i < 8; i++) {
            retval.push(num & 0xFF)
            num = num >>> 8
        }
        return retval
    }

    //  32 bit left-rotation
    function rol(num, places) {
        return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places))
    }

    // The 4 MD5 functions
    function fF(b, c, d) {
        return (b & c) | (~b & d)
    }

    function fG(b, c, d) {
        return (d & b) | (~d & c)
    }

    function fH(b, c, d) {
        return b ^ c ^ d
    }

    function fI(b, c, d) {
        return c ^ (b | ~d)
    }

    // pick 4 bytes at specified offset. Little-endian is assumed
    function bytes_to_int32(arr, off) {
        return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off])
    }

    /*
    Conver string to array of bytes in UTF-8 encoding
    See:
    http://www.dangrossman.info/2007/05/25/handling-utf-8-in-javascript-php-and-non-utf8-databases/
    http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
    How about a String.getBytes(<ENCODING>) for Javascript!? Isn't it time to add it?
    */
    function str_to_bytes(str) {
        var retval = [ ]
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) <= 0x7F) {
                retval.push(str.charCodeAt(i))
            } else {
                var tmp = encodeURIComponent(str.charAt(i)).substr(1).split('%')
                for (var j = 0; j < tmp.length; j++) {
                    retval.push(parseInt(tmp[j], 0x10))
                }
            }
        return retval
    }


    // convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
    function int128le_to_hex(a, b, c, d) {
        var ra = ""
        var t = 0
        var ta = 0
        for (var i = 3; i >= 0; i--) {
            ta = arguments[i]
            t = (ta & 0xFF)
            ta = ta >>> 8
            t = t << 8
            t = t | (ta & 0xFF)
            ta = ta >>> 8
            t = t << 8
            t = t | (ta & 0xFF)
            ta = ta >>> 8
            t = t << 8
            t = t | ta
            ra = ra + to_zerofilled_hex(t)
        }
        return ra
    }

    // conversion from typed byte array to plain javascript array
    function typed_to_plain(tarr) {
        var retval = new Array(tarr.length)
        for (var i = 0; i < tarr.length; i++) {
            retval[i] = tarr[i]
        }
        return retval
    }

    // check input data type and perform conversions if needed
    var databytes = null
    // String
    var type_mismatch = null
    if (typeof data == 'string') {
        // convert string to array bytes
        databytes = str_to_bytes(data)
    } else if (data.constructor == Array) {
        if (data.length === 0) {
            // if it's empty, just assume array of bytes
            databytes = data
        } else if (typeof data[0] == 'string') {
            databytes = chars_to_bytes(data)
        } else if (typeof data[0] == 'number') {
            databytes = data
        } else {
            type_mismatch = typeof data[0]
        }
    } else if (typeof ArrayBuffer != 'undefined') {
        if (data instanceof ArrayBuffer) {
            databytes = typed_to_plain(new Uint8Array(data))
        } else if ((data instanceof Uint8Array) || (data instanceof Int8Array)) {
            databytes = typed_to_plain(data)
        } else if ((data instanceof Uint32Array) || (data instanceof Int32Array) ||
               (data instanceof Uint16Array) || (data instanceof Int16Array) ||
               (data instanceof Float32Array) || (data instanceof Float64Array)
         ) {
            databytes = typed_to_plain(new Uint8Array(data.buffer))
        } else {
            type_mismatch = typeof data
        }
    } else {
        type_mismatch = typeof data
    }

    if (type_mismatch) {
        alert('MD5 type mismatch, cannot process ' + type_mismatch)
    }

    function _add(n1, n2) {
        return 0x0FFFFFFFF & (n1 + n2)
    }


    return do_digest()

    function do_digest() {

        // function update partial state for each run
        function updateRun(nf, sin32, dw32, b32) {
            var temp = d
            d = c
            c = b
            //b = b + rol(a + (nf + (sin32 + dw32)), b32)
            b = _add(b,
                rol(
                    _add(a,
                        _add(nf, _add(sin32, dw32))
                    ), b32
                )
            )
            a = temp
        }

        // save original length
        var org_len = databytes.length

        // first append the "1" + 7x "0"
        databytes.push(0x80)

        // determine required amount of padding
        var tail = databytes.length % 64
        // no room for msg length?
        if (tail > 56) {
            // pad to next 512 bit block
            for (var i = 0; i < (64 - tail); i++) {
                databytes.push(0x0)
            }
            tail = databytes.length % 64
        }
        for (i = 0; i < (56 - tail); i++) {
            databytes.push(0x0)
        }
        // message length in bits mod 512 should now be 448
        // append 64 bit, little-endian original msg length (in *bits*!)
        databytes = databytes.concat(int64_to_bytes(org_len * 8))

        // initialize 4x32 bit state
        var h0 = 0x67452301
        var h1 = 0xEFCDAB89
        var h2 = 0x98BADCFE
        var h3 = 0x10325476

        // temp buffers
        var a = 0, b = 0, c = 0, d = 0

        // Digest message
        for (i = 0; i < databytes.length / 64; i++) {
            // initialize run
            a = h0
            b = h1
            c = h2
            d = h3

            var ptr = i * 64

            // do 64 runs
            updateRun(fF(b, c, d), 0xd76aa478, bytes_to_int32(databytes, ptr), 7)
            updateRun(fF(b, c, d), 0xe8c7b756, bytes_to_int32(databytes, ptr + 4), 12)
            updateRun(fF(b, c, d), 0x242070db, bytes_to_int32(databytes, ptr + 8), 17)
            updateRun(fF(b, c, d), 0xc1bdceee, bytes_to_int32(databytes, ptr + 12), 22)
            updateRun(fF(b, c, d), 0xf57c0faf, bytes_to_int32(databytes, ptr + 16), 7)
            updateRun(fF(b, c, d), 0x4787c62a, bytes_to_int32(databytes, ptr + 20), 12)
            updateRun(fF(b, c, d), 0xa8304613, bytes_to_int32(databytes, ptr + 24), 17)
            updateRun(fF(b, c, d), 0xfd469501, bytes_to_int32(databytes, ptr + 28), 22)
            updateRun(fF(b, c, d), 0x698098d8, bytes_to_int32(databytes, ptr + 32), 7)
            updateRun(fF(b, c, d), 0x8b44f7af, bytes_to_int32(databytes, ptr + 36), 12)
            updateRun(fF(b, c, d), 0xffff5bb1, bytes_to_int32(databytes, ptr + 40), 17)
            updateRun(fF(b, c, d), 0x895cd7be, bytes_to_int32(databytes, ptr + 44), 22)
            updateRun(fF(b, c, d), 0x6b901122, bytes_to_int32(databytes, ptr + 48), 7)
            updateRun(fF(b, c, d), 0xfd987193, bytes_to_int32(databytes, ptr + 52), 12)
            updateRun(fF(b, c, d), 0xa679438e, bytes_to_int32(databytes, ptr + 56), 17)
            updateRun(fF(b, c, d), 0x49b40821, bytes_to_int32(databytes, ptr + 60), 22)
            updateRun(fG(b, c, d), 0xf61e2562, bytes_to_int32(databytes, ptr + 4), 5)
            updateRun(fG(b, c, d), 0xc040b340, bytes_to_int32(databytes, ptr + 24), 9)
            updateRun(fG(b, c, d), 0x265e5a51, bytes_to_int32(databytes, ptr + 44), 14)
            updateRun(fG(b, c, d), 0xe9b6c7aa, bytes_to_int32(databytes, ptr), 20)
            updateRun(fG(b, c, d), 0xd62f105d, bytes_to_int32(databytes, ptr + 20), 5)
            updateRun(fG(b, c, d), 0x2441453, bytes_to_int32(databytes, ptr + 40), 9)
            updateRun(fG(b, c, d), 0xd8a1e681, bytes_to_int32(databytes, ptr + 60), 14)
            updateRun(fG(b, c, d), 0xe7d3fbc8, bytes_to_int32(databytes, ptr + 16), 20)
            updateRun(fG(b, c, d), 0x21e1cde6, bytes_to_int32(databytes, ptr + 36), 5)
            updateRun(fG(b, c, d), 0xc33707d6, bytes_to_int32(databytes, ptr + 56), 9)
            updateRun(fG(b, c, d), 0xf4d50d87, bytes_to_int32(databytes, ptr + 12), 14)
            updateRun(fG(b, c, d), 0x455a14ed, bytes_to_int32(databytes, ptr + 32), 20)
            updateRun(fG(b, c, d), 0xa9e3e905, bytes_to_int32(databytes, ptr + 52), 5)
            updateRun(fG(b, c, d), 0xfcefa3f8, bytes_to_int32(databytes, ptr + 8), 9)
            updateRun(fG(b, c, d), 0x676f02d9, bytes_to_int32(databytes, ptr + 28), 14)
            updateRun(fG(b, c, d), 0x8d2a4c8a, bytes_to_int32(databytes, ptr + 48), 20)
            updateRun(fH(b, c, d), 0xfffa3942, bytes_to_int32(databytes, ptr + 20), 4)
            updateRun(fH(b, c, d), 0x8771f681, bytes_to_int32(databytes, ptr + 32), 11)
            updateRun(fH(b, c, d), 0x6d9d6122, bytes_to_int32(databytes, ptr + 44), 16)
            updateRun(fH(b, c, d), 0xfde5380c, bytes_to_int32(databytes, ptr + 56), 23)
            updateRun(fH(b, c, d), 0xa4beea44, bytes_to_int32(databytes, ptr + 4), 4)
            updateRun(fH(b, c, d), 0x4bdecfa9, bytes_to_int32(databytes, ptr + 16), 11)
            updateRun(fH(b, c, d), 0xf6bb4b60, bytes_to_int32(databytes, ptr + 28), 16)
            updateRun(fH(b, c, d), 0xbebfbc70, bytes_to_int32(databytes, ptr + 40), 23)
            updateRun(fH(b, c, d), 0x289b7ec6, bytes_to_int32(databytes, ptr + 52), 4)
            updateRun(fH(b, c, d), 0xeaa127fa, bytes_to_int32(databytes, ptr), 11)
            updateRun(fH(b, c, d), 0xd4ef3085, bytes_to_int32(databytes, ptr + 12), 16)
            updateRun(fH(b, c, d), 0x4881d05, bytes_to_int32(databytes, ptr + 24), 23)
            updateRun(fH(b, c, d), 0xd9d4d039, bytes_to_int32(databytes, ptr + 36), 4)
            updateRun(fH(b, c, d), 0xe6db99e5, bytes_to_int32(databytes, ptr + 48), 11)
            updateRun(fH(b, c, d), 0x1fa27cf8, bytes_to_int32(databytes, ptr + 60), 16)
            updateRun(fH(b, c, d), 0xc4ac5665, bytes_to_int32(databytes, ptr + 8), 23)
            updateRun(fI(b, c, d), 0xf4292244, bytes_to_int32(databytes, ptr), 6)
            updateRun(fI(b, c, d), 0x432aff97, bytes_to_int32(databytes, ptr + 28), 10)
            updateRun(fI(b, c, d), 0xab9423a7, bytes_to_int32(databytes, ptr + 56), 15)
            updateRun(fI(b, c, d), 0xfc93a039, bytes_to_int32(databytes, ptr + 20), 21)
            updateRun(fI(b, c, d), 0x655b59c3, bytes_to_int32(databytes, ptr + 48), 6)
            updateRun(fI(b, c, d), 0x8f0ccc92, bytes_to_int32(databytes, ptr + 12), 10)
            updateRun(fI(b, c, d), 0xffeff47d, bytes_to_int32(databytes, ptr + 40), 15)
            updateRun(fI(b, c, d), 0x85845dd1, bytes_to_int32(databytes, ptr + 4), 21)
            updateRun(fI(b, c, d), 0x6fa87e4f, bytes_to_int32(databytes, ptr + 32), 6)
            updateRun(fI(b, c, d), 0xfe2ce6e0, bytes_to_int32(databytes, ptr + 60), 10)
            updateRun(fI(b, c, d), 0xa3014314, bytes_to_int32(databytes, ptr + 24), 15)
            updateRun(fI(b, c, d), 0x4e0811a1, bytes_to_int32(databytes, ptr + 52), 21)
            updateRun(fI(b, c, d), 0xf7537e82, bytes_to_int32(databytes, ptr + 16), 6)
            updateRun(fI(b, c, d), 0xbd3af235, bytes_to_int32(databytes, ptr + 44), 10)
            updateRun(fI(b, c, d), 0x2ad7d2bb, bytes_to_int32(databytes, ptr + 8), 15)
            updateRun(fI(b, c, d), 0xeb86d391, bytes_to_int32(databytes, ptr + 36), 21)

            // update buffers
            h0 = _add(h0, a)
            h1 = _add(h1, b)
            h2 = _add(h2, c)
            h3 = _add(h3, d)
        }
        // Done! Convert buffers to 128 bit (LE)
        return int128le_to_hex(h3, h2, h1, h0).toUpperCase()
    }


}



extend( visiware, 'playalong.PlayalongApiConsts' );

/**
 * @namespace Module - Entry point of the client.
 */
visiware.playalong.PlayalongApiConsts = (function(){

	return {
		ShowStatus: {
			ERROR: -1,
			CLOSED: 0,
			RUNNING: 1,
			COUNTDOWN: 2,
			OFFLINE: 3
		}
	};

}());

/**
 *https://docs.google.com/document/d/1Jlq0DmJLRHunB6DB-IttOAz5zF7lIGwht0mDPfdu14Q/edit#
 */

extend(visiware, 'playalong.Services');

/**
 * Services - The class that communicates with the backoffice services API
 * Constructor needs the URL of the services
 * @namespace visiware.playalong.Services
 */

visiware.playalong.Services = function(url) {
	this.config = {};
	this.config.Url = url;

	/** Whether the GetCurrentShowStatus service is currently running (to avoid calling it multiple times at once)
	  * @type {Boolean}
	  * @memberof visiware.playalong.Services
	  */
	this.gettingStatus = false;
};

/** Calculates the CRC from the given params
 * @param {Object} params Contains the parameters passed to the GET or POST, like "nickname=X&supportedTeamId=39"
 * @memberof visiware.playalong.Services
 * @return String: The CRC of the request
 */

visiware.playalong.Services.prototype.ComputeCRC = function(params) {
	var privateKey = "Ahx12Z38Tt1Yz881";

	if (params == "")
	{
		params += 'privateKey=' + privateKey;
	}
	else
	{
		params += '&privateKey=' + privateKey;
	}

	var bytes = [];
	var crc = '';

	/*for (var i = 0; i < params.length; i++) {
		bytes[i] = params.charCodeAt(i);
	}

	crc = faultylabs.MD5(bytes).toString(16);*/
	
	crc = faultylabs.MD5(params).toString(16);

	return crc;
};

visiware.playalong.Services.prototype.getIEVersion = function()
{
    return ((!! window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN);
};

/** Gets the current show status and launches the callback
 * @param {function} callback The method to call when the GET result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.getCurrentShowStatus = function(callback)
{
	if (this.gettingStatus)
	{
		return;
	}

	this.gettingStatus = true;

	var self = this;

	self.finished = false;

	setTimeout(function(){
		if (!self.finished)
		{
			self.gettingStatus = false;
			self.finished = true;
			callback({
				status: visiware.playalong.PlayalongApiConsts.ShowStatus.ERROR
			})
		}
	}, 3000);

	var params = "random=" + 10000 * Math.random();
	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
		$.ajax({  url: this.config.Url + "/Show/GetCurrentShowStatus",
			data: params,
			success: function(data) {
			self.gettingStatus = false;
			self.finished = true;
			callback({
				status: data.status, // Current show status (list in ServerConnectorEvents class)
				nextShowDay: data.nextShowDay,
				nextShowMonth: data.nextShowMonth,
				nextShowYear: data.nextShowYear,
				nextShowTime: data.nextShowTime,
				timeZoneOffset: data.timeZoneOffset,
				timeRemaining: data.timeRemaining,
				awayTeam: data.awayTeam, // ID of the away team (Team1)
				homeTeam: data.homeTeam, // ID of the home team (Team2)
				name: data.name, // Name of the show
				showID: data.showId,
				leagueID: data.leagueID,	// League ID (espn info - useful for the soccer API)
				eventID: data.eventID,		// Event ID (espn info)
				channelID: data.channelID,	// Videos channel ID (espn info)
				skin: data.skin
			});
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
			if (!self.finished)
			{
				self.gettingStatus = false;
				self.finished = true;
				callback({
					status: visiware.playalong.PlayalongApiConsts.ShowStatus.ERROR
				})
			}
		  },
		  dataType: "jsonp",
		  jsonp :"jsoncallback"
		});
	}
	else
	{
		$.get(this.config.Url + "/Show/GetCurrentShowStatus", params, function(data)
		{
			self.gettingStatus = false;
			self.finished = true;
			var message = JSON.parse(data);
			callback({
				status: message.status, // Current show status (list in ServerConnectorEvents class)
				nextShowDay: message.nextShowDay,
				nextShowMonth: message.nextShowMonth,
				nextShowYear: message.nextShowYear,
				nextShowTime: message.nextShowTime,
				timeZoneOffset: message.timeZoneOffset,
				timeRemaining: message.timeRemaining,
				awayTeam: message.awayTeam, // ID of the away team (Team1)
				homeTeam: message.homeTeam, // ID of the home team (Team2)
				name: message.name, // Name of the show
				showID: message.showId,
				leagueID: message.leagueID,	// League ID (espn info - useful for the soccer API)
				eventID: message.eventID,		// Event ID (espn info)
				channelID: message.channelID,	// Videos channel ID (espn info)
				skin: message.skin
			});
		})
		.fail(function() {
			if (!self.finished)
			{
				self.gettingStatus = false;
				self.finished = true;
				callback({
					status: visiware.playalong.PlayalongApiConsts.ShowStatus.ERROR
				})
			}
		});
	}
};

/** Creates a new user in the backoffice
 * @param {object} params Contains all the parameters required for the new user creation. All parameters are optional:
 * -	firstName (string)
 * -	lastName (string)
 * -	nickname (string)
 * -	email (string)
 * -	birthdate (string, format id DD/MM/YYYY)
 * -	sex (int, 0 = male, 1 = female)
 * -	age (int)
 * -	geoLocation (string)
 * -	allowContact (Boolean) – whether this user allows you to contact them or not
 * -	device (string)
 * -	facebookID (long)
 * -	facebookHash (string)
 * -	twitterID (long)
 * -	twitterHash (string)
 * -	twitterAvatarURL (string)
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userCreate = function(params, callback) {

	crcParams = this.getCrcParams(params);

	params.crc = this.ComputeCRC(crcParams);
	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/Create",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result,
					sessionTicket: data.data,
					errorMessage: data.errorMessage
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				callback({
					result: 0,
					errorMessage: "Request has failed"
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/Create", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result,
				sessionTicket: message.data,
				errorMessage: message.errorMessage
			});
		})
		.fail(function() {
			callback({
				result: 0,
				errorMessage: "Request has failed"
			});
		});
	}
};

/** Returns the CRC Params for a user creation or update, based on the parameters given
 * @param {object} params Contains all the parameters required for the new user creation or update
 * @memberof visiware.playalong.Services
 * @return The CRC params to send to the ComputeCRC method
 */

visiware.playalong.Services.prototype.getCrcParams = function(params){
	crcParams = "";
	if (params.sessionTicket != undefined) crcParams = this.addCrcParam (crcParams, "sessionTicket", params.sessionTicket);
	if (params.username != undefined) crcParams = this.addCrcParam (crcParams, "username", params.username);
	if (params.password != undefined) crcParams = this.addCrcParam (crcParams, "password", params.password);
	if (params.facebookID != undefined) crcParams = this.addCrcParam (crcParams, "facebookID", params.facebookID);
	if (params.facebookHash != undefined) crcParams = this.addCrcParam (crcParams, "facebookHash", params.facebookHash);
	if (params.twitterID != undefined) crcParams = this.addCrcParam (crcParams, "twitterID", params.twitterID);
	if (params.twitterHash != undefined) crcParams = this.addCrcParam (crcParams, "twitterHash", params.twitterHash);
	if (params.twitterAvatarURL != undefined) crcParams = this.addCrcParam (crcParams, "twitterAvatarURL", params.twitterAvatarURL);
	if (params.firstName != undefined) crcParams = this.addCrcParam (crcParams, "firstName", params.firstName);
	if (params.lastName != undefined) crcParams = this.addCrcParam (crcParams, "lastName", params.lastName);
	if (params.email != undefined) crcParams = this.addCrcParam (crcParams, "email", params.email);
	if (params.birthDate != undefined) crcParams = this.addCrcParam (crcParams, "birthDate", params.birthDate);
	if (params.sex != undefined) crcParams = this.addCrcParam (crcParams, "sex", params.sex);
	if (params.age != undefined) crcParams = this.addCrcParam (crcParams, "age", params.age);
	if (params.geoLocation != undefined) crcParams = this.addCrcParam (crcParams, "geoLocation", params.geoLocation);
	if (params.allowContact != undefined) crcParams = this.addCrcParam (crcParams, "allowContact", params.allowContact);
	if (params.nickname != undefined) crcParams = this.addCrcParam (crcParams, "nickname", params.nickname);
	if (params.address != undefined) crcParams = this.addCrcParam (crcParams, "address", params.address);
	if (params.zipCode != undefined) crcParams = this.addCrcParam (crcParams, "zipCode", params.zipCode);
	if (params.town != undefined) crcParams = this.addCrcParam (crcParams, "town", params.town);
	if (params.phone != undefined) crcParams = this.addCrcParam (crcParams, "phone", params.phone);
	if (params.device != undefined) crcParams = this.addCrcParam (crcParams, "device", params.device);
	if (params.supportedTeamID != undefined) crcParams = this.addCrcParam (crcParams, "supportedTeamID", params.supportedTeamID);
	if (params.optIns != undefined) crcParams = this.addCrcParam (crcParams, "optIns", params.optIns);

	return crcParams;
}

/** Adds a single CRC param to the string
 * @param {String} currentString The current string of CRC params
 * @param {String} paramName The name of the parameter
 * @param {String} paramValue The value of the parameter
 * @memberof visiware.playalong.Services
 * @return The new string of CRC parameters
 */
visiware.playalong.Services.prototype.addCrcParam = function(currentString, paramName, paramValue){
	if (currentString != "")
	{
		currentString += "&";
	}
	currentString += paramName + "=" + paramValue;

	return currentString;
}

/** Authenticates an existing user
 * @param {Object} params Contains the player's sessionTicket
 * @param {function} callback The method to callback with the result
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userAuthenticate = function(params, callback) {
	crcParams = "sessionTicket=" + params.sessionTicket;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/Authenticate",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result,
					details: data.data
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				callback({
					result: 0,
					errorMessage: "Request has failed"
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/Authenticate", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result,
				details: message.data
			});
		})
		.fail(function() {
			callback({
				result: 0,
				errorMessage: "Request has failed"
			});
		});
	}
};

/** Updates an existing user
 * @param {Object} params Contains the player's sessionTicket and the other parameters (same as user creation)
 * @param {function} callback The method to callback with the result
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userUpdate = function(params, callback) {
	crcParams = this.getCrcParams(params);
	params.crc = this.ComputeCRC(crcParams);

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/Update",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result,
                    details: data.details
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				callback({
					result: 0,
					errorMessage: "Request has failed"
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/Update", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result,
                details: message.errorMessage
			});
		})
		.fail(function() {
			callback({
				result: 0,
				errorMessage: "Request has failed"
			});
		});
	}
};

/** Sends a player move (which answer he chose for a question)
 * @param {Object} params Contains the client's session ticket, show ID, session ID, question ID, answer ID (not 1-4, each answer of the show has a specific ID that must be stored), answer speed (in decimals, IE 9.3),
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.sendPlayerMove = function(params, callback) {

	crcParams = "sessionTicket=" + params.sessionTicket;
	crcParams += "&showID=" + params.showID;
	crcParams += "&sessionID=" + params.sessionID;
	crcParams += "&questionID=" + params.questionID;
	crcParams += "&answerID=" + params.answerID;
	crcParams += "&answerSpeed=" + params.answerSpeed;
	params.crc = this.ComputeCRC(crcParams);

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/Show/SendPlayerMove",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result,
					points: data.data,
					questionID: params.questionID,
					questionType: params.questionType,
                    errorCode : data.errorCode,
                    errorMessage : data.errorMessage
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/Show/SendPlayerMove", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result,
				points: message.data,
				questionID: params.questionID,
				questionType: params.questionType,
                errorCode : message.errorCode,
                errorMessage : message.errorMessage
			});
		});
	}
};

/** Gets the user rank
 * @param {Object} params Object that must contain the sessionTicket of the user and the snapshotID of the last leaderboard received.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.getUserRank = function(params, callback) {
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
		// Use Microsoft XDR
            var xdr = new XDomainRequest();
            xdr.open("get", this.config.Url + "/Show/GetUserRank?sessionTicket=" + params.sessionTicket + "&snapshotID=" + params.snapshotID + "&random=" + 10000 * Math.random());
            xdr.onload = function() {
				callback({
					rank: parseInt(xdr.responseText,10),
					sessionTicket: params.sessionTicket,
					snapshotID: params.snapshotID
				});
            };
            xdr.send();
	}
	else
	{
		$.get(this.config.Url + "/Show/GetUserRank", params, function(data)
		{
			callback({
				rank: data,
				sessionTicket: params.sessionTicket,
				snapshotID: params.snapshotID
			});
		})
		.fail(function() {
			callback({
				rank: 0,
				errorMessage: "Request has failed",
				sessionTicket: params.sessionTicket,
				snapshotID: params.snapshotID
			});
		});
	}
};

/** Logins a user and returns the sessionTicket
 * @param {Object} params Object that must contain the username and password of the user.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userLogin = function(params, callback) {
	crcParams = "username=" + params.username;
	crcParams += "&password=" + params.password;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/Login",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				if (data.result == 1)
				{
					callback({
						result: data.result,
						sessionTicket: data.data.sessionTicket,
						username: data.data.username,
						details: data.data
					});
				}
				else
				{
					call({
						result: data.result,
						username: params.username,
						password: params.password,
						errorMessage: data.errorMessage
					})
				}
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/Login", params, function(data)
		{
			var message = JSON.parse(data);
			if (message.result == 1)
			{
				callback({
					result: message.result,
					sessionTicket: message.data.sessionTicket,
					username: message.data.username,
					details: message.data
				});
			}
			else
			{
				callback({
					result: message.result,
					errorMessage: message.errorMessage
				});
			}
		});
	}
};

/** Logins a user by Facebook and returns the sessionTicket
 * @param {Object} params Object that must contain the facebookId and facebookHash of the user.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userLoginByFacebook = function(params, callback) {
	crcParams = "facebookID=" + params.facebookID;
	crcParams += "&facebookHash=" + params.facebookHash;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/LoginByFacebook",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				if (data.result == 1)
				{
					callback({
						result: data.result,
						sessionTicket: data.data.sessionTicket,
						username: data.data.username,
						details: data.data
					});
				}
				else
				{
					call({
						result: data.result,
						errorMessage: data.errorMessage
					})
				}
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/LoginByFacebook", params, function(data)
		{
			var message = JSON.parse(data);
			if (message.result == 1)
			{
				callback({
					result: message.result,
					sessionTicket: message.data.sessionTicket,
					username: message.data.username,
					details: message.data
				});
			}
			else
			{
				callback({
					result: message.result,
					errorMessage: message.errorMessage
				});
			}
		});
	}
};

/** Logins a user by Twitter and returns the sessionTicket
 * @param {Object} params Object that must contain the twitterId and twitterHash of the user.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userLoginByTwitter = function(params, callback) {
	crcParams = "twitterID=" + params.twitterID;
	crcParams += "&twitterHash=" + params.twitterHash;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/LoginByTwitter",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				if (data.result == 1)
				{
					callback({
						result: data.result,
						sessionTicket: data.data.sessionTicket,
						username: data.data.username,
						details: data.data
					});
				}
				else
				{
					call({
						result: data.result,
						errorMessage: data.errorMessage
					})
				}
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/LoginByTwitter", params, function(data)
		{
			var message = JSON.parse(data);
			if (message.result == 1)
			{
				callback({
					result: message.result,
					sessionTicket: message.data.sessionTicket,
					username: message.data.username,
					details: message.data
				});
			}
			else
			{
				callback({
					result: message.result,
					errorMessage: message.errorMessage
				});
			}
		});
	}
};

/** Logins a user and returns the sessionTicket
 * @param {Object} params Object that must contain the username and password of the user.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userLoginByEmail = function(params, callback) {
	crcParams = "email=" + params.email;
	crcParams += "&password=" + params.password;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/LoginByEmail",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				if (data.result == 1)
				{
					callback({
						result: data.result,
						sessionTicket: data.data.sessionTicket,
						username: data.data.username,
						details: data.data
					});
				}
				else
				{
					callback({
						result: data.result,
						errorMessage: data.errorMessage
					})
				}
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.post(this.config.Url + "/User/LoginByEmail", params, function(data)
		{
			var message = JSON.parse(data);
			if (message.result == 1)
			{
				callback({
					result: message.result,
					sessionTicket: message.data.sessionTicket,
					username: message.data.username,
					details: message.data
				});
			}
			else
			{
				callback({
					result: message.result,
					errorMessage: message.errorMessage
				})
			}
		});
	}
};

/** Gets the details of a user (username, nickname, etc) from the sessionTicket
 * @param {Object} params Object that must contain the sessionTicket of the user.
 * @param {function} callback The method to call when the request's result has arrived
 * @memberof visiware.playalong.Services
 */
visiware.playalong.Services.prototype.userDetails = function(params, callback) {
	crcParams = "sessionTicket=" + params.sessionTicket;
	params.crc = this.ComputeCRC(crcParams);

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/Details",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result,
					details: data.data
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.get(this.config.Url + "/User/Details", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result,
				details: message.data
			});
		});
	}
};

/**
 */
visiware.playalong.Services.prototype.sendPasswordByEmail = function(params, callback) {
	crcParams = "email=" + params.email;
	params.crc = this.ComputeCRC(crcParams);

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/User/SendPasswordByEmail",
			data: crcParams + "&crc=" + params.crc,
			success: function(data) {
				callback({
					result: data.result
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.get(this.config.Url + "/User/SendPasswordByEmail", params, function(data)
		{
			var message = JSON.parse(data);
			callback({
				result: message.result
			});
		});
	}
};

visiware.playalong.Services.prototype.getLeaderboard = function(params, callback) {
	throw visiware.tools.Utils.Exception('NotImplementedException', 'Method GetLeaderboard is not implemented in the client.');
	//callback({});
};

visiware.playalong.Services.prototype.getFriendsLeaderBoard = function(params, callback) {
	throw visiware.tools.Utils.Exception('NotImplementedException', 'Method GetFriendsLeaderBoard is not implemented in the client.');
	//callback({});
};

visiware.playalong.Services.prototype.getAnswersDistribution = function(params, callback) {
	crcParams = "showID=" + params.showID;
	crcParams += "&questionID=" + params.questionID;

	crcParams += "&random=" + 10000 * Math.random();
	params.random = 10000 * Math.random();

	// TODO $.browser has been deprecated since jQuery 1.3 and is removed in 1.9
	if (this.getIEVersion() != NaN && this.getIEVersion() < 10)
	{
	    // Use JSONP
		$.ajax({  url: this.config.Url + "/Show/GetAnswersDistribution",
			data: crcParams,
			success: function(data) {
				var resultDistribution = data.data.answersDistribution;

				var distribution = [];
				for (i = 0; i < resultDistribution.length; i++)
				{
					distribution[i] = {answerID: resultDistribution[i].answerId, answerCount: resultDistribution[i].numOfPlayers};
				}

				callback({
					result: data.result,
					distribution: distribution,
					showID: params.showID,
					questionID: params.questionID
				});
			},
			dataType: "jsonp",
			jsonp :"jsoncallback"
		});
	}
	else
	{
		$.get(this.config.Url + "/Show/GetAnswersDistribution", crcParams, function(data)
		{
			var message = JSON.parse(data);

			var resultDistribution = message.data.answersDistribution;

			var distribution = [];
			for (i = 0; i < resultDistribution.length; i++)
			{
				distribution[i] = {answerID: resultDistribution[i].answerId, answerCount: resultDistribution[i].numOfPlayers};
			}

			callback({
				result: message.result,
				distribution: distribution,
				showID: params.showID,
				questionID: params.questionID
			});
		});
	}
};

visiware.playalong.Services.prototype.GetShowQuestions = function(callback, showId)
{
	var params = "showId=" + showId;

	$.get(this.config.Url.replace("services", "api") + "/Show/GetShowQuestions", params, function(data)
	{
		var message = JSON.parse(data);
		callback(message);
	})
	.fail(function() {
		callback(null);
	});
};

extend(visiware, 'playalong.ExternalServices');

visiware.playalong.ExternalServices = function(cacheUrl) {
	this.cacheUrl = cacheUrl;
};

visiware.playalong.ExternalServices.prototype.GetPastShows = function(callback) {

	var finalUrl = this.cacheUrl + "show-list.json";

	$.ajax({  url: finalUrl,
		data: "random=" + 10000 * Math.random(),
		success: function(json){
			if (json != "" && json != "{}")
			{
				result = {
					currentShowId: json.CurrentShowId,
					pastShows: json.ShowList
				};

				callback(result);
			}
			else
			{
				callback(null);
			}
		},
		error: function(){
		},
		dataType: "jsonp",
		jsonpCallback:"jsoncallback"
	});
};

visiware.playalong.ExternalServices.prototype.GetShowLeaderboard = function(callback, showId) {
	var self = this;
	var finalUrl = this.cacheUrl + showId + "/leaderboard.json";

	$.ajax({  url: finalUrl,
		data: "random=" + 10000 * Math.random(),
		success: function(json){
			if (json != "" && json != "{}")
			{
				var i;
				var finalRanks = [];

				for (i = 0; i < json.LeaderBoard.length; i++)
				{
					var currentPlayer = json.LeaderBoard[i];

					finalRanks[i] = {sessionTicket: currentPlayer.SessionTicket, rank: currentPlayer.Rank, nickname: currentPlayer.NickName, score: currentPlayer.Score, teamId: currentPlayer.TeamID, facebookID: currentPlayer.FacebookID, twitterID: currentPlayer.TwitterID, twitterAvatarURL: currentPlayer.TwitterAvatarURL};
					if (finalRanks[i].nickname == null || finalRanks[i].nickname == "")
					{
						finalRanks[i].nickname = "Guest " + parseInt(1000000 * Math.random(), 10);
					}
				}

				result = {
					homeTeamTotalScore: json.HomeTeamTotalScore,
					awayTeamTotalScore: json.AwayTeamTotalScore,
					homeTeamTotalPlayers: json.HomeTeamTotalPlayers,
					awayTeamTotalPlayers: json.AwayTeamTotalPlayers,
					ranks: finalRanks
				};

				callback(result);
			}
			else
			{
				callback(null);
			}
		},
		error: function(){
			self.GetShowLeaderboard(callback);
		},
		dataType: "jsonp",
		jsonpCallback:"jsoncallback"
	});
};

visiware.playalong.ExternalServices.prototype.GetShowStatisticsAll = function(callback, showId) {

	var finalUrl = this.cacheUrl + showId + "/statistics/AllStatistics.json";

	$.ajax({  url: finalUrl,
		data: "random=" + 10000 * Math.random(),
		success: function(json){
			if (json != "" && json != "{}")
			{
				var i;
				var j;
				var finalStats = [];

				for (i = 0; i < json.QuestionsDistribution.length; i++)
				{
					var currentQuestion = json.QuestionsDistribution[i];

					var answers = [];

					for (j = 0; j < currentQuestion.AnswersDistribution.length; j++)
					{
						answers[j] = {answerId: currentQuestion.AnswersDistribution[j].AnswerID, numOfPlayers: currentQuestion.AnswersDistribution[j].NumOfPlayers};
					}

					finalStats[i] = {questionId: currentQuestion.QuestionID, answers: answers};
				}

				result = {
					questions: finalStats
				};

				callback(result);
			}
			else
			{
				callback(null);
			}
		},
		error: function(error){
		},
		dataType: "jsonp",
		jsonpCallback:"jsoncallback"
	});
};

visiware.playalong.ExternalServices.prototype.GetShowStatisticsSingle = function(callback, showId, questionId) {

	var finalUrl = this.cacheUrl + showId + "/statistics/question" + questionId + ".json";

	$.ajax({  url: finalUrl,
		data: "random=" + 10000 * Math.random(),
		success: function(json){
			if (json != "" && json != "{}")
			{
				var j;

				var answers = [];

				for (j = 0; j < json.AnswersDistribution.length; j++)
				{
					answers[j] = {answerId: json.AnswersDistribution[j].AnswerID, numOfPlayers: json.AnswersDistribution[j].NumOfPlayers};
					console.log("Adding answerID: " + json.AnswersDistribution[j].AnswerID);
				}

				var finalStats = {questionId: json.QuestionID, answers: answers};

				result = {
					questionId: finalStats.questionId,
					answers: finalStats.answers
				};

				callback(result);
			}
			else
			{
				callback(null);
			}
		},
		error: function(){
		},
		dataType: "jsonp",
		jsonpCallback:"jsoncallback"
	});
};

visiware.playalong.ExternalServices.prototype.GetQuestionInfo = function(callback, showId, questionId, hash) {

	var finalUrl = this.cacheUrl + showId + "/questions/question_" + questionId + "_" + hash + ".json";

	$.ajax({  url: finalUrl,
		data: "random=" + 10000 * Math.random(),
		success: function(json){
			if (json != "" && json != "{}")
			{
				var i;

				var answers = [];

				for (i = 0; i < json.answers.length; i++)
				{
					answers[i] = {answerId: json.answers[i].answerId, answerText: json.answers[i].answerText};
				}

				var result = {
					questionType: json.questionType,
					questionId: json.questionId,
					questionText: json.questionText,
					questionState: json.questionState,
					pushTimestamp: json.pushTimestamp,
					correctAnswerId: json.correctAnswerId,
					sessionId: json.sessionId,
					answers: answers,
                    timeStamp : json.pushTimestamp,
                    templateKey : json.templateKey,
				};

				callback(result);
			}
			else
			{
				callback(null);
			}
		},
		error: function(x, status, error){
			callback(null);
		},
		dataType: "jsonp",
        timeout : 5000,
		jsonpCallback:"jsoncallback_question_" + questionId
	});
};



extend(visiware, 'playalong.lite.Api');

visiware.playalong.lite.Api = function(_config) {
    if(_config == undefined || _config.servicesUrl == undefined || _config.cacheUrl == undefined)
    {
        throw { name: 'GeneralException', error: 'Config is not correct.' }
    }

    this.config = _config;
    this.services = new visiware.playalong.Services(_config.servicesUrl);
    this.cache = new visiware.playalong.ExternalServices(_config.cacheUrl);
};
