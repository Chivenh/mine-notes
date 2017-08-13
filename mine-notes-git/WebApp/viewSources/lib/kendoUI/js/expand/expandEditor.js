/**
 * @author LFH
 * 颜色选择器
 * */
kendo.spreadsheet.registerEditor("colorEditor", function(){
       var context, dlg, colorpicker, model;
       function create() {
           if (!dlg) {
               model = kendo.observable({
                   value: "#000000",
                   ok: function() {
                       context.callback(model.value);
                       dlg.close();
                   },
                   cancel: function() {
                       dlg.close();
                   }
               });
               var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                          "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                          "  <div style='margin-top: 1em; text-align: right'>" +
                          "    <button style='width: 6em' class='k-button' data-bind='click: ok'>OK</button>" +
                          "    <button style='width: 6em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                          "  </div>" +
                          "</div>");
               kendo.bind(el, model);
               dlg = el.getKendoWindow();
           }
       }
       function open() {
           create();
           dlg.open();
           dlg.center();
           var value = context.range.value();
           if (value != null) {
               model.set("value", value);
           }
       }
       return {
           edit: function(options) {
               context = options;
               open();
           },
           icon: "k-font-icon k-i-background"
       }
   });
