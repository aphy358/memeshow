module.exports = {
  removeHtmlTab: function (r) {
    return r.replace(/(<([^>]+)>)/gi, "");
  },
  html2Escape: function (r) {
    return r.replace(/[<>&"]/g, function (r) {
      return {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;"
      }[r];
    });
  },
  escape2Html: function (r) {
    var t = {
      lt: "<",
      gt: ">",
      nbsp: " ",
      amp: "&",
      quot: '"'
    };
    return r.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (r, e) {
      return t[e];
    });
  },
  return2Br: function (r) {
    return r.replace(/\r?\n/gi, "<br>");
  },
  Br2return: function (r) {
    return r.replace(/<br\s*\/?>/gi, "\n");
  }
};