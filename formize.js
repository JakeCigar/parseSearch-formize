$.fn.formize = function(values) {
    var o = $.extend(true, {}, values|| parseSearch())
    return this.each(function() {
        $.each(this.elements||$(this).find(":input"), function() {
            var name = this.name
            if(name && o[name]) {
                var vals = [].concat(o[name])
                if (this.nodeName==="SELECT")
                    $(this).val(vals)
                else if(this.type === "checkbox" || this.type === "radio") {
                    this.checked = vals.indexOf(this.value) >= 0
                }
                else {
                    this.value = vals.shift()
                    o[name] = vals
                }
            }
        })
    })
}
function parseSearch(string) {
    string = string ||location.search 
    var searchObject = {}
    $.map(string.replace(/^\?/, '').split('&'), function(v) {
        var pair = v.split('=').map(decodeURIComponent)
        pair[1] = (pair[1] || "").replace(/\+/g, " ")
        if(typeof searchObject[pair[0]] === "undefined")
            searchObject[pair[0]] = pair[1]
        else if($.isArray(searchObject[pair[0]]))
            searchObject[pair[0]].push(pair[1])
        else
            searchObject[pair[0]] = [searchObject[pair[0]], pair[1]]
    });
    return searchObject
}
