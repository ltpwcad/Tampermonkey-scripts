// ==UserScript==
// @name         Newscon
// @version      0.1
// @description  timer reset
// @author       Ltpwcad
// @match        https://www.newscon.net/d/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    getlink = function (recaptchaToken) {
  timeOnSite = 500;
  console.log(timeOnSite)
   window.focus()
  clearInterval(interval_id);
  var interval = null;
  clearInterval(interval);
  var timeRefresh = 16000;
  var totalTime = 0;
  $("#result").html("");
  $("#timer").html("");
  $("#btnSubmit").prop("disabled", true);
  var formData = $("#target").serializeArray();
  formData.push({ name: "recaptchaToken", value: recaptchaToken });
  $.ajax({
    cache: false,
    type: "POST",
    url: "/downloader/api",
    dataType: "json",
    data: formData,
    success: function (data) {
      downloadURL = "";
      $("#timer").html("");
      if (data.error) {
        $("#result").html(
          '<div class="u-overflowHidden u-flex0 u-width100pct" "' +
            '" target="_blank"><h2 class="ui-h2 ui-xs-h4 ui-clamp3" style="color: red!important;">' +
            data.error +
            "</h2></div>" +
            "<br>"
        );
        $("#btnSubmit").prop("disabled", false);
        timeOnSite = 0;
        clearInterval(interval_id);
      } else {
        fileURL = data.file_url;
        $("#result").html(
          '<div class="u-overflowHidden u-flex0 u-width100pct" "' +
            '" target="_blank"><h2 class="" style="color: green!important;font-size: 15px !important;">' +
            data.message +
            "</h2></div>" +
            "<br>"
        );
        if (interval != null) {
          clearInterval(interval);
        }
        interval = setInterval(function () {
          $.ajax({
            cache: false,
            type: "GET",
            url: "/downloader/api?id=" + data.task_id,
            dataType: "json",
            data: $("#target").serialize(),
            success: function (data2) {
              if (data2.error) {
                $("#result").html(
                  '<div class="u-overflowHidden u-flex0 u-width100pct" "' +
                    '" target="_blank"><h2 class="ui-h2 ui-xs-h4 ui-clamp3" style="color: red!important;">' +
                    data2.error +
                    "</h2></div>" +
                    "<br>"
                );
                clearInterval(interval);
                $("#btnSubmit").prop("disabled", false);
              } else if (data2["r"].length > 0) {
                var a = data2["r"][0];
                downloadURL = a;
                var url = new URL(a);
                if (timeOnSite >= WAITING_TIME) {
                  if (url.pathname === "/status") {
                    $("#result").html(
                      '<a class="ds-link ds-link--stylePointer u-overflowHidden u-flex0 u-width100pct" href="' +
                        a +
                        '" target="_blank"><h2 class="ui-h2 ui-xs-h4 ui-clamp3" style="color: #FFD700!important;">' +
                        "Đang xử lý link, bấm vào đây để kiểm tra trạng thái / We are processing your request, click here to check the status" +
                        "</h2></a>" +
                        "<br>"
                    );
                  } else {
                    $("#result").html(
                      '<a class="ds-link ds-link--stylePointer u-overflowHidden u-flex0 u-width100pct" href="' +
                        a +
                        '" target="_blank"><h2 class="ui-h2 ui-xs-h4 ui-clamp3" style="color: #0645AD!important;">' +
                        a +
                        "</h2></a>" +
                        "<br>"
                    );
                  }
                }
                clearInterval(interval);
                $("#btnSubmit").prop("disabled", false);
              }
            },
          });
          totalTime += timeRefresh;
          if (totalTime > 480000) {
            $("#result").html(
              '<div class="u-overflowHidden u-flex0 u-width100pct" "' +
                '" target="_blank"><h2 class="ui-h2 ui-xs-h4 ui-clamp3" style="color: red!important;">' +
                "Task timed out after 8 minutes" +
                "</h2></div>" +
                "<br>"
            );
            clearInterval(interval);
            $("#btnSubmit").prop("disabled", false);
          }
        }, timeRefresh);
      }
    },
  });
}

})();