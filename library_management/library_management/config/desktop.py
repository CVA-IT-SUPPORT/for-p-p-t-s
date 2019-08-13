from frappe import _

def get_data():
	return {
		"Library Management": {
			"color": "#589494",
			"icon": "icon-book",
			"type": "module",
			"label": _("Library Management")
		},
		"Service Request": {
			"color": "A3A3FF",
			"icon": "address-book",
			"type": "link",
			"link": "List/Service Request/List",
			"label": _("Service Request")
		}
	}
