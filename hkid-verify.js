function hkidCharVal(ch) {
  var intVal = ch.charCodeAt(0);
  if (intVal >= 48 && intVal <= 57) {
    return (intVal - 48);
  }
  if (intVal >= 65 && intVal <= 90) {
    return (intVal - 55);
  }
  return false;
}

function verifyHKID(hkid) {
  var len;
	if (hkid.match(/^[a-z][0-9]{6}((\([0-9]\))|([0-9]))$/i) !== null) {
    len = 8
  } else if (hkid.match(/^[a-z][a-z][0-9]{6}((\([0-9]\))|([0-9]))$/i) !== null) {
    len = 9
  } else {
    return false;
  }
  var hkidLen = hkid.length
  var lastChar = hkid.charAt(hkidLen - 1);
  var hasParen = lastChar === ')';
  var chkSum = hasParen ? hkid.charAt(hkidLen - 2) : lastChar;
  var val = 324;
  var currVal;
  for (var i = len; i >= 2; i--) {
    if ((currVal = hkidCharVal(hkid.charAt(8 - i))) === false) return false;
    val += currVal * i 
  }
  val %= 11
  if (val == 0) val = '0';
  else if (val == 1) val = 'A';
  else val = (11 - val).toString();
  return chkSum === val ? (hasParen ? hkid : hkid.slice(0, hkidLen - 1) + '(' + chkSum + ')').toUpperCase(): false;
}
