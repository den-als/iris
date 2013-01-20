iris.screen(function (self) {

    self.create = function() {
        // initial configuration
        iris.locale(
            "en_US", {
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dateFormat: "m/d/Y h:i:s",
                currency: {
                    formatPos: "n",
                    formatNeg: "(n)",
                    decimal: ".",
                    thousand: ",",
                    precision: 2
                }
            }
        );
        iris.locale("en_US");



        self.tmpl("test/component/bindings.html");

        var data = { person: { name:"test name", money: -67890.678, region: { country: "country test" }, lastLogin: 1358506927400, updated: "Fri Jan 18 2013 13:09:47 GMT+0100 (CET)" } };
        //var data = { person: { name:"test name", money: -67890.678, region: { country: "country test" } }, lastLogin: "Fri Jan 18 2013 13:09:47 GMT+0100 (CET)" };

        self.inflate(data);

        // Check printed values
        window.expect(9);

        window.strictEqual(self.get("test_div").text(), data.person.name, "Data bindings on divs");
        window.strictEqual(self.get("test_span").text(), data.person.name, "Data bindings on spans");
        window.strictEqual(self.get("test_button").text(), data.person.region.country, "Data bindings on button");
        window.strictEqual(self.get("test_input_text").val(), data.person.name, "Data bindings on text inputs");
        window.strictEqual(self.get("test_input_hidden").val(), data.person.name, "Data bindings on hidden inputs");
        window.strictEqual(self.get("test_textarea").val(), data.person.name, "Data bindings on textareas");



        //
        // with formats
        //

        // Currency

        var money = iris.currency( data.person.money );
        window.strictEqual(self.get("test_format_currency").text(), money, "Data bindings with currency formats");

        // Dates
        var date = iris.date( data.person.lastLogin );
        window.strictEqual(self.get("test_format_date").text(), date, "Data bindings with date formats without params");

        date = iris.date( data.person.updated, "y-m-d" );
        window.strictEqual(self.get("test_format_date_params").text(), date, "Data bindings with date formats with params");


        window.start();

    };

},"test/component/bindings.js");