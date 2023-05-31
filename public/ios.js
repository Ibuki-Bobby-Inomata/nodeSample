// iOS でモーションセンサーを取り扱えるように細工する
window.addEventListener("DOMContentLoaded", async (event) => {
    if (
      typeof DeviceMotionEvent.requestPermission === "function" &&
      sessionStorage.getItem("isPermission") !== "true"
    ) {
      await new Promise((resolve) => {
        const tingleLinkElement = document.createElement("link");
        tingleLinkElement.rel = "stylesheet";
        tingleLinkElement.href =
          "https://cdnjs.cloudflare.com/ajax/libs/tingle/0.15.3/tingle.min.css";
        document.head.appendChild(tingleLinkElement);
  ​
        tingleLinkElement.onload = () => {
          const tingleScriptElement = document.createElement("script");
          tingleScriptElement.src =
            "https://cdnjs.cloudflare.com/ajax/libs/tingle/0.15.3/tingle.min.js";
          document.head.appendChild(tingleScriptElement);
  ​
          tingleScriptElement.onload = () => {
            const modal = new tingle.modal({
              footer: true,
            });
  ​
            modal.setContent("<p>このサイトでは、センサー値を扱います。</p>");
            modal.addFooterBtn(
              "Cancel",
              "tingle-btn tingle-btn--default tingle-btn--pull-right",
              () => {
                modal.close();
                resolve();
              }
            );
  ​
            modal.addFooterBtn(
              "OK",
              "tingle-btn tingle-btn--primary tingle-btn--pull-right",
              () => {
                modal.close();
                resolve();
              }
            );
  ​
            document
              .querySelector(
                ".tingle-btn.tingle-btn--primary.tingle-btn--pull-right"
              )
              .addEventListener("click", async () => {
                const isDeviceOrientationEvent =
                  await DeviceOrientationEvent.requestPermission();
                const isDeviceMotionEvent =
                  await DeviceMotionEvent.requestPermission();
  ​
                // 許可したあとはまた許可が必要になるまでポップアップが出ないようにする
                if (isDeviceOrientationEvent && isDeviceMotionEvent) {
                  sessionStorage.setItem("isPermission", "true");
                  resolve();
                }
              });
  ​
            modal.open();
          };
        };
      });
    }
  });