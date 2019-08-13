// Copyright (c) 2016, Frappe and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Test Report"] = {
	"filters": [ {
		"fieldname":"work_type",
		"label": __("Work Type"),
		"fieldtype": "Select",
		"options": ["","COM", "D-Form", "E-Form"]
		},

	]
}
