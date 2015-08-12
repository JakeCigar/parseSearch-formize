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
$.fn.toJSON = function(){
    var o = {}
    $.each(this.serializeArray(), function(i,el) {
        var e=o[el.name]
        if (e===undefined)
            o[el.name] = el.value
        else if (e.push) 
            e.push(el.value)
        else 
            o[el.name]=[e,el.value]
    });
    return o
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
    if (this.prop("nodeName")==="FORM")
        return new FormData(this[0])
    var formData = new FormData(),
        fileElements = this.filter(":file"),
        append=function(n,v) {
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
