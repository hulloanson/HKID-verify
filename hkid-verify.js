function hkidCharVal(ch) {
  console.log('charVal');
  console.log('ch:', ch);
  var intVal = ch.charCodeAt(0);
  console.log('intVal:', intVal);
  if (intVal >= 48 && intVal <= 57) {
    console.log(intVal-48);
    return (intVal - 48);
  }
  if (intVal >= 65 && intVal <= 90) {
    console.log('intVal, intVal - 55', intVal, intVal - 55);
    return (intVal - 55);
  }
  return false;
}

function verifyHKID(hkid) {
  console.log("Verifying~");
  var len;
  hkid = hkid.replace(/\(|\)/g, '');
  console.log('hkid:', hkid);
	if (hkid.match(/^[A-Z][0-9]{6}[0-9]$/) !== null) {
    len = 8
  } else if (hkid.match(/^[A-Z][A-Z][0-9]{6}[0-9]$/) !== null) {
    len = 9
  } else {
    return false;
  }
  var val = 324;
  var currVal;
  for (var i = len; i >= 2; i--) {
    if ((currVal = hkidCharVal(hkid.charAt(8 - i))) === false) return false;
    console.log('currVal,i:', currVal, i);
    val += currVal * i 
  }
  val %= 11
  if (val == 0) val = '0';
  else if (val == 1) val = 'A';
  else val = (11 - val).toString();
  console.log('chkSum:', val);
  return (hkid.charAt(hkid.length - 1) === val ? true : false );
}
