var MIXPANEL_LIB_URL = "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";

(function (document, mixpanel) {
  if (!mixpanel["__SV"]) {
    var script,
      first_script,
      gen_fn,
      functions,
      i,
      lib_name = "mixpanel";
    window[lib_name] = mixpanel;

    mixpanel["_i"] = [];

    mixpanel["init"] = function (token, config, name) {
      var target = mixpanel;
      if (typeof name !== "undefined") {
        target = mixpanel[name] = [];
      } else {
        name = lib_name;
      }

      target["people"] = target["people"] || [];
      target["toString"] = function (no_stub) {
        var str = lib_name;
        if (name !== lib_name) {
          str += "." + name;
        }
        if (!no_stub) {
          str += " (stub)";
        }
        return str;
      };
      target["people"]["toString"] = function () {
        return target.toString(1) + ".people (stub)";
      };

      function _set_and_defer(target, fn) {
        var split = fn.split(".");
        if (split.length == 2) {
          target = target[split[0]];
          fn = split[1];
        }
        target[fn] = function () {
          target.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }

      functions =
        "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(
          " "
        );
      for (i = 0; i < functions.length; i++) {
        _set_and_defer(target, functions[i]);
      }

      var group_functions = "set set_once union unset remove delete".split(" ");
      target["get_group"] = function () {
        var mock_group = {};

        var call1_args = arguments;
        var call1 = ["get_group"].concat(
          Array.prototype.slice.call(call1_args, 0)
        );

        function _set_and_defer_chained(fn_name) {
          mock_group[fn_name] = function () {
            var call2_args = arguments;
            var call2 = [fn_name].concat(
              Array.prototype.slice.call(call2_args, 0)
            );
            target.push([call1, call2]);
          };
        }
        for (var i = 0; i < group_functions.length; i++) {
          _set_and_defer_chained(group_functions[i]);
        }
        return mock_group;
      };

      mixpanel["_i"].push([token, config, name]);
    };

    mixpanel["__SV"] = 1.2;

    script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    if (typeof MIXPANEL_CUSTOM_LIB_URL !== "undefined") {
      script.src = MIXPANEL_CUSTOM_LIB_URL;
    } else if (
      document.location.protocol === "file:" &&
      MIXPANEL_LIB_URL.match(/^\/\//)
    ) {
      script.src = "https:" + MIXPANEL_LIB_URL;
    } else {
      script.src = MIXPANEL_LIB_URL;
    }

    first_script = document.getElementsByTagName("script")[0];
    first_script.parentNode.insertBefore(script, first_script);
  }
})(document, window["mixpanel"] || []);
