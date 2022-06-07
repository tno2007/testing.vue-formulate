export const getObjectValue = (o: any, s: string) => {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (o === Object(o) && k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
