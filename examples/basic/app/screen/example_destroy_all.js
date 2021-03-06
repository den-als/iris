iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.example_destroy_all_tmpl);

		self.get("btncreateUI").click(createUI);
		self.get("btn_destroy_all").click(_DestroyAllUIs);
	}

	function createUI() {
		self.ui("uis", iris.path.ui_example, {
			"count" : self.uis.length
		});
	}

	function _DestroyAllUIs() {
		self.destroyUIs("uis");
	}
}, iris.path.example_destroy_all);