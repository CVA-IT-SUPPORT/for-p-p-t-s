frappe.listview_settings['Service Request'] = {
//	var zone_name = "";
	colwidths: {"subject": 6},
        onload: function(me) {
		var owner = "";
		var zone_name = "";
		if( frappe.session.user == "Administrator" || frappe.user_roles.indexOf("Service Manager") != -1 ) {
		owner = "";
		console.log("Owner :");
		console.log(frappe.session.user);
		var userdoc  = frappe.user_info().zone;
		console.log(userdoc);

        var company = ""
        frappe.call({
                method: "frappe.client.get_value",
                args: {
                        doctype: "User",
                        fieldname: "zone_name",
                        filters: {
                                name: frappe.session.user
                        }
                },
                async: false,
                callback: function(r) {
                        company = r.message.zone_name;
			console.log( r.message );
                }
        })

//
console.log(company);
		} else if( frappe.session.user != "Administrator" && frappe.user_roles.indexOf("Zone Head") != -1 ) {
                        frappe.call({
                                method: "frappe.client.get_value",
                                args: {
                                        doctype: "User",
                                        fieldname: "zone_name",
                                        filters: {
                                                name: frappe.session.user
                                        }
                                },
                                async: false,
                                callback: function(r) {
                                        zone_name = r.message.zone_name;
                                        console.log( r.message );
                                }
                        })
		} else {
		owner = frappe.session.user;
		}

		if( frappe.user_roles.indexOf("Service Manager") != -1 || frappe.session.user != "admin@welcare.com") {
			console.log("Test Permission");
		        frappe.call({
        		        method: "frappe.client.get_value",
		                args: {
                		        doctype: "User",
		                        fieldname: "zone_name",
                		        filters: {
                                		name: frappe.session.user
		                        }
                		},
		                async: false,
                		callback: function(r) {
//		                        zone_name = r.message.zone_name;
//					owner = "";
                		        console.log( r.message );
		                }
		        })
		}

		console.log("Before zone :");
		console.log(zone_name);
                frappe.route_options = {
			"zone": zone_name,
                        "owner": owner,
                        "status": ""
                };
                me.page.set_title(__("Service Request"));

        },
        hide_name_column: true,
        refresh: function(me) {
                // override assigned to me by owner
                me.page.sidebar.find(".assigned-to-me a").off("click").on("click", function() {
                        var assign_filter = me.filter_list.get_filter("assigned_by");
                        assign_filter && assign_filter.remove(true);

                        me.filter_list.add_filter(me.doctype, "owner", '=', frappe.session.user);
                        me.run();
                });

                // add assigned by me
                me.page.add_sidebar_item(__("Assigned By Me"), function() {
                        var assign_filter = me.filter_list.get_filter("owner");
                        assign_filter && assign_filter.remove(true);

                        me.filter_list.add_filter(me.doctype, "assigned_by", '=', frappe.session.user);
                        me.run();
                }, ".assigned-to-me");
        },
        add_fields: ["reference_type", "reference_name"],
}

