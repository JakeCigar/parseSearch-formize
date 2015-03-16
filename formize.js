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
                    if (this.type!=="file") this.value = vals.shift()
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
$.fn.serializeFormData = function() {
    var formData = new FormData(),
        elements = this.prop("elements"),
        fileElements = (elements? $(elements) : this).filter(":file"),
        append=function(n,v) {
//             console.log("fd",arguments)
            return formData.append(n,v)
        }
    $.each(this.serializeArray(), function (i, val) {
        if ($.isArray(val.value)) 
            for (var i = 0; i < val.value.length; i++) {
                append(val.name, val.value[i])
            }
        else
            append(val.name, val.value)
    })
    $.each(fileElements,function(i,el){
        $.each(el.files,function(i,file){
            append(el.name,file)
        })
    })
    return formData
}
