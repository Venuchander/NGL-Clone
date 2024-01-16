$(document).ready(function () {
  let userData = JSON.parse(window.localStorage.getItem("userData"));

  $(".form").submit(function (e) {
    e.preventDefault();
    
    if ($("#question").val().trim() === "") {
      return alert("Please enter a question first!");
    }

    $(".submit").attr("disabled", true);
    mixpanel.track("web_tapped_send");

    let referrer = document.referrer;
    if (navigator.userAgent.includes("Snapchat"))
      referrer = "https://snapchat.com";

    let data = {
      username: username,
      question: $("#question").val(),
      deviceId: $(".deviceId").val(),
      gameSlug: gameSlug,
      referrer: referrer,
    };

    if (gameSlug === "celebai") {
      data.voiceId = $("#celebSelected").val();
    }

    $.ajax({
      url: "/api/submit",
      type: "POST",
      data,
    })
      .done(function (data) {
        console.log("Sent Question", data);
        window.localStorage.setItem(
          "userData",
          JSON.stringify({
            questionId: data.questionId,
            priorityInboxEnabled,
            paymentAvailable,
            ig_pfp_url,
            ig_username,
          })
        );

        const userLanguage = $("meta[name='user:language']").attr("content");
        let url = "/p/sent";

        if (gameSlug === "celebai") {
          window.localStorage.setItem(
            "voiceData",
            JSON.stringify({
              voiceUrl: data.voiceUrl,
              voiceName: data.voiceName,
              voiceImageUrl: data.voiceImageUrl,
            })
          );

          url = "/p/voiceSent";
        }

        if (gameSlug) url += `/${gameSlug}`;
        if (userLanguage) url += `?lng=${userLanguage}`;
        window.location.href = url;
      })
      .fail(function (err) {
        console.log("submitted - failed");
        console.log("Error submitting question", err);
        alert("Internet error! Try again");
      });
  });
});
